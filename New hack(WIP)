(function() {
  const targetURL = "https://sso.prodigygame.com/oauth/userinfo";


  const originalFetch = window.fetch;
  window.fetch = async function(...args) {
    const url = typeof args[0] === "string" ? args[0] : args[0]?.url;
    if (url && url.startsWith(targetURL)) {
      const response = await originalFetch.apply(this, args);
      const cloned = response.clone();
      try {
        const text = await cloned.text();
        const data = JSON.parse(text);
        data.employee = true;
        const modifiedBlob = new Blob([JSON.stringify(data)], {type: "application/json"});
        const modifiedResponse = new Response(modifiedBlob, {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers
        });
        return modifiedResponse;
      } catch (e) {
        return response;
      }
    } else {
      return originalFetch.apply(this, args);
    }
  };

  
  const originalOpen = XMLHttpRequest.prototype.open;
  const originalSend = XMLHttpRequest.prototype.send;

  XMLHttpRequest.prototype.open = function(method, url, ...rest) {
    this._isUserinfoRequest = url.startsWith(targetURL);
    return originalOpen.apply(this, [method, url, ...rest]);
  };

  XMLHttpRequest.prototype.send = function(...rest) {
    if (this._isUserinfoRequest) {
      let intercepted = false;
      this.addEventListener('readystatechange', function() {
        if (this.readyState === 4 && this.status === 200 && !intercepted) {
          intercepted = true;
          try {
            let responseType = this.responseType;
            let responseText = responseType === '' || responseType === 'text' ? this.responseText : null;
            if (responseText) {
              let data = JSON.parse(responseText);
              data.employee = true;
              let modifiedResponse = JSON.stringify(data);

              Object.defineProperty(this, "responseText", { get: () => modifiedResponse });
              Object.defineProperty(this, "response", { get: () => modifiedResponse });

              window.modifiedUserinfo = data;
              console.log('Modified userinfo response (XHR):', data);
            }
          } catch (e) {
            console.error('Failed to modify userinfo XHR response:', e);
          }
        }
      });
    }
    return originalSend.apply(this, rest);
  };

  console.log('Waiting for API response!');
})();
