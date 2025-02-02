export async function updateFile(owner, repo, path, token, newContent, commitMessage = "Updated JSON file") {
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

    try {
        // Fetch the current SHA
        const response = await fetch(apiUrl, {
            headers: {
                Authorization: `token ${token}`,
                Accept: "application/vnd.github.v3+json"
            }
        });

        if (!response.ok) throw new Error(`Error fetching file: ${response.statusText}`);

        const data = await response.json();
        const sha = data.sha; // Get the SHA

        // Convert JSON to base64
        const updatedContent = Buffer.from(JSON.stringify(newContent, null, 2)).toString("base64");

        // Send PUT request to update the file
        const updateResponse = await fetch(apiUrl, {
            method: "PUT",
            headers: {
                Authorization: `token ${token}`,
                Accept: "application/vnd.github.v3+json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: commitMessage,
                content: updatedContent,
                sha: sha // Required for updating the file
            })
        });

        if (!updateResponse.ok) throw new Error(`Error updating file: ${updateResponse.statusText}`);

        console.log("✅ File updated successfully!");
    } catch (error) {
        console.error("❌ Error:", error.message);
    }
}
