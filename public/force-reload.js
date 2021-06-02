(function () {
  var r = new XMLHttpRequest();
  r.onload = function () {
    var t = r.responseText;
    var versionStart = t.indexOf('"/precache-manifest.') + 20;
    var versionEnd = t.indexOf('.js"', versionStart);

    if (versionEnd - versionStart === 32) {
      var ls = localStorage;
      var oldPrecacheManifestVersion = ls.getItem("pmv");
      var newPrecacheManifestVersion = t.substring(versionStart, versionEnd);

      if (newPrecacheManifestVersion !== oldPrecacheManifestVersion) {
        ls.setItem("pmv", newPrecacheManifestVersion);
        return window.location.reload(true);
      }
    }
  };
  r.open("GET", "/service-worker.js?c=" + new Date().getTime());
  r.setRequestHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  r.send();
})();
