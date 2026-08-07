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

export async function getProductById(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('No se pudo obtener el producto.');
  }

  return response.json();
}

export async function createProduct(product) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error('No se pudo crear el producto.');
  }

  return response.json();
}

export async function updateProduct(id, product) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error('No se pudo actualizar el producto.');
  }

  return response.json();
}

export async function deleteProduct(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('No se pudo eliminar el producto.');
  }

  return true;
}
