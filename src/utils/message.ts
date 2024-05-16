// Function to send a message to the content script, now with parameters for customization
export function sendMessageToContent(
  message: any,
  callback?: (response: any) => void
) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    console.log("Sending message to content script:", message)
    if (tabs.length > 0) {
      // Send a message to the content script in the active tab
      chrome.tabs.sendMessage(tabs[0].id!, message, (response) => {
        console.log("Response from content script:", response)
        // Call the callback function if provided
        if (callback) {
          callback(response)
        }
      })
    }
  })
}
