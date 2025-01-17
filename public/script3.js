document.addEventListener("DOMContentLoaded", function () {
    const divElement = document.getElementById("viz1640003227805");
    const vizElement = divElement.getElementsByTagName("object")[0];

    // Embed Tableau visualization
    vizElement.innerHTML = `
        <param name="host_url" value="https%3A%2F%2Fpublic.tableau.com%2F" />
        <param name="embed_code_version" value="3" />
        <param name="site_root" value="" />
        <param name="name" value="DataBreachAnalysis_16400031589670/ExtentofDataBreach" />
        <param name="tabs" value="yes" />
        <param name="toolbar" value="yes" />
        <param name="animate_transition" value="yes" />
        <param name="display_static_image" value="yes" />
        <param name="display_spinner" value="yes" />
        <param name="display_overlay" value="yes" />
        <param name="display_count" value="yes" />
        <param name="language" value="en-GB" />
    `;

    // Adjust dimensions
    if (divElement.offsetWidth > 800) {
        vizElement.style.width = "800px";
        vizElement.style.height = "850px";
    } else if (divElement.offsetWidth > 500) {
        vizElement.style.width = "800px";
        vizElement.style.height = "850px";
    } else {
        vizElement.style.width = "100%";
        vizElement.style.height = "750px";
    }

    // Load Tableau API
    const scriptElement = document.createElement("script");
    scriptElement.src = "https://public.tableau.com/javascripts/api/viz_v1.js";
    vizElement.parentNode.insertBefore(scriptElement, vizElement);
});
