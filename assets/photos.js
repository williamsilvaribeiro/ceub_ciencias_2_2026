// Shared real-photo API sources, used by the Memory game and the image mode
// of the 15-puzzle. No API keys required; every source degrades to `null`
// on failure so callers can fall back to local icons/numbers.
function fetchWithTimeout(url, ms = 5000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), ms);
  return fetch(url, { signal: controller.signal }).finally(() => clearTimeout(timeout));
}

async function fetchDogPhotos(count) {
  try {
    const res = await fetchWithTimeout(`https://dog.ceo/api/breeds/image/random/${count}`);
    const data = await res.json();
    if (data.status !== 'success' || !Array.isArray(data.message) || data.message.length < count) {
      throw new Error('Resposta inesperada da API');
    }
    return data.message.slice(0, count);
  } catch (err) {
    return null;
  }
}

async function fetchCatPhotos(count) {
  try {
    const res = await fetchWithTimeout(`https://api.thecatapi.com/v1/images/search?limit=${count}`);
    const data = await res.json();
    if (!Array.isArray(data) || data.length < count) throw new Error('Resposta inesperada da API');
    return data.slice(0, count).map(d => d.url);
  } catch (err) {
    return null;
  }
}

async function fetchFoxPhotos(count) {
  try {
    const requests = Array.from({ length: count }, () =>
      fetchWithTimeout('https://randomfox.ca/floof/').then(r => r.json()).then(d => d.image)
    );
    const urls = await Promise.all(requests);
    if (urls.some(u => !u)) throw new Error('Resposta inesperada da API');
    return urls;
  } catch (err) {
    return null;
  }
}

async function getPokemonPhotos(count) {
  const ids = new Set();
  while (ids.size < count) ids.add(1 + Math.floor(Math.random() * 898));
  return [...ids].map(id => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`);
}

async function fetchShibePhotos(count) {
  try {
    const res = await fetchWithTimeout(`https://shibe.online/api/shibes?count=${count}&urls=true&httpsUrls=true`);
    const data = await res.json();
    if (!Array.isArray(data) || data.length < count) throw new Error('Resposta inesperada da API');
    return data.slice(0, count);
  } catch (err) {
    return null;
  }
}

async function fetchBirdPhotos(count) {
  try {
    const res = await fetchWithTimeout(`https://shibe.online/api/birds?count=${count}`);
    const data = await res.json();
    if (!Array.isArray(data) || data.length < count) throw new Error('Resposta inesperada da API');
    return data.slice(0, count);
  } catch (err) {
    return null;
  }
}

const PHOTO_SOURCES = {
  dogs:    { label: 'Cachorros',  alt: 'Foto de cachorro',  fetch: fetchDogPhotos },
  shibas:  { label: 'Shibas',     alt: 'Foto de shiba inu', fetch: fetchShibePhotos },
  cats:    { label: 'Gatos',      alt: 'Foto de gato',      fetch: fetchCatPhotos },
  foxes:   { label: 'Raposas',    alt: 'Foto de raposa',    fetch: fetchFoxPhotos },
  birds:   { label: 'Pássaros',   alt: 'Foto de pássaro',   fetch: fetchBirdPhotos },
  pokemon: { label: 'Pokémon',    alt: 'Pokémon',           fetch: getPokemonPhotos }
};

function randomPhotoSource() {
  const keys = Object.keys(PHOTO_SOURCES);
  return keys[Math.floor(Math.random() * keys.length)];
}
