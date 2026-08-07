const API_URL = 'https://backservicetest-g8emcvdff0fqe2b8.canadacentral-01.azurewebsites.net/api/producto';

export async function getProducts() {
  const response = await fetch(API_URL, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('No se pudieron cargar los productos.');
  }

  return response.json();
}
