/**
 * BiocharEngine (v2 - LocalStorage)
 * A simple JS module to load, save, and manage project data
 * in the browser's localStorage.
 */
(function(window) {

    // Internal cache to hold data in memory
    let _cachedData = null;
    const DATA_KEY = "biocharProjectData";

    /**
     * Loads project data.
     * 1. Tries to get from in-memory cache.
     * 2. If cache is empty, tries to get from localStorage.
     * 3. If localStorage is empty, returns a new, blank object.
     * @returns {object} The project data object.
     */
    function loadProjectData() {
        if (_cachedData) {
            // console.log("Loaded from cache");
            return _cachedData;
        }

        try {
            const storedData = localStorage.getItem(DATA_KEY);
            if (storedData) {
                // console.log("Loaded from localStorage");
                _cachedData = JSON.parse(storedData);
                return _cachedData;
            }
        } catch (e) {
            console.error("Error parsing project data from localStorage:", e);
        }

        // console.log("No data found, creating new object");
        _cachedData = {}; // Start fresh
        return _cachedData;
    }

    /**
     * Saves the provided data object to both localStorage and the in-memory cache.
     * @param {object} dataToSave - The complete project data object to save.
     */
    function saveProjectData(dataToSave) {
        if (!dataToSave) {
            console.error("Save failed: No data object provided.");
            return;
        }

        try {
            const dataString = JSON.stringify(dataToSave);
            localStorage.setItem(DATA_KEY, dataString);
            _cachedData = dataToSave; // Update cache
            // console.log("Project data saved.");
        } catch (e) {
            console.error("Error saving project data to localStorage:", e);
        }
    }

    /**
     * [NEW FUNCTION]
     * Clears all project data from both localStorage and the in-memory cache.
     */
    function clearProjectData() {
        try {
            localStorage.removeItem(DATA_KEY);
            localStorage.removeItem("currentProjectId"); // Also clear the current project ID
            _cachedData = {}; // Clear in-memory cache
            console.log("Project data cleared.");
        } catch (e) {
            console.error("Error clearing project data:", e);
        }
    }


    // Expose the public API on the window object
    window.BiocharEngine = {
        loadProjectData: loadProjectData,
        saveProjectData: saveProjectData,
        clearProjectData: clearProjectData // *** NEW ***
    };

})(window);