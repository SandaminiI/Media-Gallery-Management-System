import http from "../api/http";

export default function ZipDownloadPanel({ items, selected, setSelected }) {
  function selectAll() {
    setSelected(items.map((x) => x._id));
  }

  function clearSelection() {
    setSelected([]);
  }

  async function downloadZip() {
    if (selected.length === 0) return alert("Select at least one item");

    try {
      const res = await http.post(
        "/api/media/zip",
        { ids: selected },
        { responseType: "blob" }
      );

      const blob = new Blob([res.data], { type: "application/zip" });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "media.zip";
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (e) {
      alert(e.response?.data?.message || "ZIP download failed");
    }
  }

  return (
    <div className="d-flex flex-wrap gap-2 align-items-center mb-3">
      <div>
        Selected: <strong>{selected.length}</strong>
      </div>

      <button type="button" className="btn btn-outline-secondary btn-sm" onClick={selectAll}>
        Select All
      </button>

      <button type="button" className="btn btn-outline-secondary btn-sm" onClick={clearSelection}>
        Clear
      </button>

      <button type="button" className="btn btn-primary btn-sm" onClick={downloadZip}>
        Download ZIP
      </button>
    </div>
  );
}
