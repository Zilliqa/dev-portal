use anyhow::{anyhow, Result};
use serde::Deserialize;
use std::path::PathBuf;
use std::{env, fs};
use zqutils::commands::CommandBuilder;

const API_URL: &str = "https://api.zq2-devnet.zilliqa.com";

#[derive(Clone, Deserialize)]
struct Version {
    refspec: String,
    name: Option<String>,
}

#[derive(Clone, Deserialize)]
struct Zq2Spec {
    versions: Vec<Version>,
}

#[tokio::main]
async fn main() -> Result<()> {
    let args: Vec<String> = env::args().collect();
    let here = String::from(&args[1]);

    // Set NO_CHECKOUT to skip the checkout steps - this allows you to do debugging with symlinks or similar.
    let mut checkout = std::env::var("NO_CHECKOUT").is_err();

    // Find the zq2 versions that we need to collect.
    let root_path = PathBuf::from(&here);
    let versions: Zq2Spec =
        serde_yaml::from_str(&fs::read_to_string(format!("{}/zq2_spec.yaml", here))?)?;
    for vrec in &versions.versions {
        let refspec = &vrec.refspec;
        let name: String = match vrec.name {
            None => {
                if refspec.len() > 8 {
                    refspec[..7].to_string()
                } else {
                    refspec.to_string()
                }
            }
            Some(ref val) => val.to_string(),
        };
        println!("Compiling zq2 version {name}");
        let mut cache_dir: Option<PathBuf> = Some(root_path.clone().join("cache"));
        let zq2_checkout_dir: PathBuf;
        if let Ok(val) = std::env::var("USE_ZQ2_FROM") {
            checkout = false;
            cache_dir = None;
            zq2_checkout_dir = PathBuf::from(val);
        } else if let Some(val) = &cache_dir {
            zq2_checkout_dir = val.clone().join("zq2");
        } else {
            return Err(anyhow!(
                "No zq2 specified - no cache dir and USE_ZQ2_FROM is not specified"
            ));
        }

        let id_prefix = format!("Versions/{name}");
        let target_dir = root_path.clone().join("zq2").join("docs");
        let target_dir_str = target_dir
            .as_os_str()
            .to_str()
            .ok_or(anyhow!("unprintable path"))?
            .to_string();
        if checkout {
            // Check out the zq2 version
            println!("  Check out zq2 into {zq2_checkout_dir:?}");
            // Does it exist?
            // Use https so that those (me!) with yubikeys don't need to keep touching them.
            if fs::metadata(zq2_checkout_dir.clone().join(".git")).is_ok() {
                // Update.
                CommandBuilder::new()
                    .cmd("git", &["fetch", "https://github.com/zilliqa/zq2", refspec])
                    .current_dir(&zq2_checkout_dir.clone())?
                    .run_logged()
                    .await?
                    .success_or("Cannot run git fetch")?;
            } else if let Some(val) = &cache_dir {
                // Clone
                CommandBuilder::new()
                    .cmd("git", &["clone", "https://github.com/zilliqa/zq2"])
                    .current_dir(&val.clone())?
                    .run_logged()
                    .await?
                    .success_or("Cannot run git clone")?;
            };
            // Check out
            CommandBuilder::new()
                .cmd("git", &["checkout", refspec])
                .current_dir(&zq2_checkout_dir.clone())?
                .run_logged()
                .await?
                .success_or("Cannot run git checkout")?;
        }
        // First, zap the target
        let doc_dir = format!("{target_dir_str}/versions/{name}");
        println!(" Removing {doc_dir} ... ");
        if fs::metadata(&doc_dir).is_ok() {
            fs::remove_dir_all(&doc_dir)?;
        }

        let index_file_path = root_path.clone().join("zq2").join("mkdocs.yaml");
        let index_file_template_path = root_path.clone().join("zq2").join("mkdocs.in.yaml");
        // Now copy the mkdocs file ..
        tokio::fs::copy(&index_file_template_path, &index_file_path).await?;
        let index_file_name = index_file_path
            .as_os_str()
            .to_str()
            .ok_or(anyhow!("unprintable index file path"))?
            .to_string();
        let key_prefix = "nav".to_string();
        println!(" Generating documentation from {refspec} into {target_dir_str}...");
        let z2_dir = zq2_checkout_dir.clone();
        println!(" Running {z2_dir:?}/z2 .. ");
        // Now we can run the docgen
        CommandBuilder::new()
            .cmd(
                "scripts/z2",
                &[
                    "doc-gen",
                    &target_dir_str,
                    "--id-prefix",
                    &id_prefix,
                    "--index-file",
                    &index_file_name,
                    "--key-prefix",
                    &key_prefix,
                    "--api-url",
                    API_URL,
                ],
            )
            .current_dir(&z2_dir.clone())?
            .run_logged()
            .await?
            .success_or("Couldn't run z2")?;
    }
    Ok(())
}
