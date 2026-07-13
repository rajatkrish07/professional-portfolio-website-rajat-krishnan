/**
 * Triggers a robust, cross-browser file download using a Blob-based strategy.
 * It handles mobile browser quirks, Safari limitations, iframe constraints, and
 * native sharing fallbacks to ensure maximum reliability on iOS Safari, Android, and desktop.
 * 
 * @param data - The Blob or file URL string to download
 * @param filename - The target filename (default: 'Rajat_Krishnan_Resume.pdf')
 */
export async function downloadFile(data: Blob | string, filename: string = 'Rajat_Krishnan_Resume.pdf'): Promise<void> {
  let blob: Blob;

  // If a URL string is provided, fetch it as a Blob
  if (typeof data === 'string') {
    try {
      const response = await fetch(data, {
        headers: {
          'Accept': 'application/pdf, */*'
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      blob = await response.blob();
    } catch (fetchError) {
      console.error('Failed to fetch the file as a Blob, trying direct link fallback:', fetchError);
      // Fallback: Try to trigger a normal direct link download if fetch fails
      const link = document.createElement('a');
      link.href = data;
      link.download = filename;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }
  } else {
    blob = data;
  }

  // Detect runtime browser/device characteristics
  const userAgent = navigator.userAgent || '';
  const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  const isIos = /iPad|iPhone|iPod/.test(userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isSafari = /^((?!chrome|android).)*safari/i.test(userAgent);
  const isIframe = window.self !== window.top;

  // Strategy 1: Mobile native share sheet via Web Share API
  // This is highly reliable for iOS & Android Chrome/Safari as it offers save-to-files/AirDrop directly.
  if (isMobileDevice && navigator.canShare) {
    try {
      const fileType = blob.type || 'application/pdf';
      const file = new File([blob], filename, { type: fileType });
      if (navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: filename,
          text: `Download ${filename}`,
        });
        return; // Success!
      }
    } catch (shareError: any) {
      if (shareError.name === 'AbortError') {
        console.log('User dismissed/cancelled native sharing interface.');
        return; // Normal cancellation, do not fall back or show error
      }
      console.warn('Native share failed or was cancelled, falling back to traditional download:', shareError);
    }
  }

  // Strategy 2: iOS Safari & iPadOS specific custom iframe/DataURL fallback
  // Blobs & object URLs are heavily restricted/blocked inside certain webviews or Safari iframe contexts.
  if (isIos && isSafari) {
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        try {
          const newWindow = window.open();
          if (newWindow) {
            newWindow.document.write(
              `<iframe src="${dataUrl}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`
            );
            newWindow.document.title = filename;
          } else {
            // If popups are blocked, fallback to direct location replacement
            window.location.href = dataUrl;
          }
          resolve();
        } catch (iframeErr) {
          console.warn('Iframe write failed, performing location fallback:', iframeErr);
          window.location.href = dataUrl;
          resolve();
        }
      };
      reader.onerror = () => {
        reject(new Error('Failed to convert file Blob to compatible base64 Data URL.'));
      };
      reader.readAsDataURL(blob);
    });
  }

  // Strategy 3: Standard object URL with high-compatibility anchor triggering
  try {
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;

    // Use target="_blank" inside mobile browsers and sandboxed iframes to bypass pop-up blocks or cross-origin restrictions
    if (isMobileDevice || isIframe) {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Keep the object URL alive long enough to initiate download in the event loop before garbage collection
    setTimeout(() => {
      URL.revokeObjectURL(blobUrl);
    }, 15000);
  } catch (urlError) {
    console.error('Traditional anchor download failed, utilizing native save fallback:', urlError);
    // Absolute fallback: Let standard browser mechanisms handle it
    throw new Error('Traditional anchor download failed.');
  }
}
