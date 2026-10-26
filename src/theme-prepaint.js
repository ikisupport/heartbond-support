// Resolve and apply the saved theme before first paint, so the page never
// flashes the wrong palette. Inlined into every page's <head> verbatim by
// scripts/extract-theme-prelude.mjs, ahead of any React code: it must run
// synchronously and cannot be a module.
//
// app/lib/theme.tsx implements the same resolution rule for the live page.
// These two are still a pair — this one runs before React exists and cannot
// import from it — so a change to the rule belongs in both. What extraction
// did remove is the palette duplication: the tokens have one source now.
(function () {
  var choice = "system";
  try {
    var raw = localStorage.getItem("heartbond-theme");
    if (raw === "system" || raw === "calm" || raw === "classic" || raw === "dark") {
      choice = raw;
    }
  } catch (e) {}
  var resolved = choice === "system"
    ? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "calm")
    : choice;
  document.documentElement.setAttribute("data-theme", resolved);
})();
