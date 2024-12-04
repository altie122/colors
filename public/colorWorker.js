// colorWorker.js
self.onmessage = function (event) {
  const { type, startIndex, batchSize } = event.data;

  const colors = [];
  let endIndex;

  if (type === 'blues') {
    endIndex = Math.min(startIndex + batchSize, 256); // Blues: b = 0 to 255
    for (let b = startIndex; b < endIndex; b++) {
      colors.push(`#0000${b.toString(16).padStart(2, '0')}`);
    }
  } else if (type === 'greens') {
    endIndex = Math.min(startIndex + batchSize, 256 * 256); // Greens: g = 1 to 255, b = 0 to 255
    for (let i = startIndex; i < endIndex; i++) {
      const g = Math.floor(i / 256);
      const b = i % 256;
      colors.push(`#00${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`);
    }
  } else if (type === 'reds') {
    endIndex = Math.min(startIndex + batchSize, 256 * 256 * 256); // Reds: r = 1 to 255, g = 0 to 255, b = 0 to 255
    for (let i = startIndex; i < endIndex; i++) {
      const r = Math.floor(i / (256 * 256));
      const g = Math.floor((i % (256 * 256)) / 256);
      const b = i % 256;
      colors.push(`#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`);
    }
  }

  self.postMessage({ colors, type, nextIndex: endIndex });
};
