function humanSize(inBytes) {
  const NAMES = [ "KiB", "MiB", "GiB", "TiB" ];
  let minSize = 1000;
  let bestYet = null;
  for (let i = 0;i < NAMES.length; ++i) {
    let reportAs = inBytes / minSize;
    // The replace is horrid - sorry!
    bestYet = reportAs.toFixed(2).replace(".00", "") + " " + NAMES[i];
    minSize = minSize * 1000;
    if (reportAs < 1000) {
      return bestYet;
    }
  }
  return reportAs;
}

async function getBlockHash(apiUrl, block) {
  const hexBlock = `0x${block.toString(16)}`;
  var data = {
    id: "1",
    jsonrpc: "2.0",
    method: "eth_getBlockByNumber",
    params: [ hexBlock, false ]
  };
  return fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json", },
    body: JSON.stringify(data) })
    .then((response) => response.json())
    .then((data) => {
      return data.result.hash
    });
}

async function generateTableRow(apiUrl, baseUrl, value) {
  // Find the block hash
  return getBlockHash(apiUrl, value.block).then(
    (h) => {
      return `<tr><td><a href="${baseUrl}/${value.key}">${value.block}</a></td><td><code>${h}</code></td><td>${humanSize(value.size)}</td></tr>`;
    });
}

async function fillCheckpointTableFromElem(elem) {
  const listUrl = elem.getAttribute("list");
  const apiUrl = elem.getAttribute("api");
  const nrCheckpoints = elem.getAttribute("number");
  // Get the list of checkpoints.
  let inner = fetch(listUrl).then((data) =>
    {
      parser = new DOMParser();
      data.text().then((docText) => {
        xmlDoc = parser.parseFromString(docText, "text/xml");
        let switchoverBlock = null;
        sortedCheckpoints = []
        var checkpoints = xmlDoc.getElementsByTagName("Contents");
        for (let i = 0;i < checkpoints.length; ++i) {
          let c = checkpoints[i];
          let key = c.getElementsByTagName("Key")[0].textContent;
          let size = c.getElementsByTagName("Size")[0].textContent;
          let isSwitchover = false;
          if (key.startsWith("switchover/")) {
            block = parseInt(key.substring(11))
            switchoverBlock = { key, block, size }
          } else {
            if (key.startsWith("previous/")) {
              block = parseInt(key.substring(10))
            } else {
              block = parseInt(key)
            }
            sortedCheckpoints.push({ key, block, size })
          }
        }
        sortedCheckpoints.sort( (a,b) => b.block - a.block );
        let contents = ""
        const sliced = sortedCheckpoints.slice(0, nrCheckpoints);
        const tableHeader = "<tr>" +
              "<th>Checkpoint</th>" +
              "<th>Hash</th>" +
              "<th>Size</th>" +
              "</tr>";
        new Promise(function(resolve, reject) {
          if (sliced.length > 0) {
            const promises = sliced.map( (v) => generateTableRow(apiUrl, listUrl, v) );
            Promise.all(promises).then(function (values) {
              const tableContents = values.reduce( (acc,v) => acc + v, "")
              contents += "<table>" + tableHeader + tableContents + "</table>";
              resolve(contents);
            }, function (err) {
              console.log("Err - " + err);
            });
          } else {
            contents +=  '<p><i>There are no checkpoints currently stored for this network</i></p>';
            resolve(contents);
          }
        }).then(function (contents) {
          if (switchoverBlock) {
            let tableData = generateTableRow(apiUrl, listUrl, switchoverBlock).then((value) => {
              contents += "<p>The checkpoint at which this network switched from ZQ1 was:</p>";
              contents += "<table>" + tableHeader + value + "</table>";
              elem.innerHTML = contents;
            });
          } else {
            elem.innerHTML = contents;
          }
        });
      });
    },
    (err) => {
      console.log(err);
      elem.innerHTML = `Unable to fetch checkpoint list - please try again later; check browser console for details`;
    });
}
  

function fillInCheckpoints() {
  var ids = document.getElementsByClassName("zq2_checkpoints");
  for (let i =0 ; i < ids.length; ++i) {
    fillCheckpointTableFromElem(ids[i])
  }
}

document$.subscribe( () => fillInCheckpoints() );
