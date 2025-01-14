const API_BASE_URL = 'https://api.escuelajs.co/api/v1';
const PRODUCT_API_BASE_URL = 'https://dummyjson.com';
interface LoginCredentials {
  email: string;
  password: string;
}

interface UserData {
  name: string;
  email: string;
  password: string;
  avatar: string;
}
type ProductListResponse = {
  limit: number;
  skip: number;
  total: number;
  products: any[];
};
export const loginUserService = async (credentials: LoginCredentials): Promise<{ access_token: string }> => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Login failed');
  }

  return response.json();
};

export const registerUserService = async (userData: UserData): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Registration failed');
  }

  return response.json();
};

export const fetchUsersService = async (): Promise<any[]> => {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  return response.json();
};

export const fetchProductService = async (): Promise<ProductListResponse> => {
  const response = await fetch(`${PRODUCT_API_BASE_URL}/products`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const data = await response.json();
  return {
    limit: data.limit,
    skip: data.skip,
    total: data.total,
    products: data.products,  // Ensure this is an array of products
  };
};
