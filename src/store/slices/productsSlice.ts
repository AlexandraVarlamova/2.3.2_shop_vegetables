import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Product } from '../../components/Catalog/Catalog';

const productsData: Product[] = [
  { id: 1, title: 'Broccoli', weight: '1 kg', price: 120, image: '/assets/brocolli.png' },
  { id: 2, title: 'Cauliflower', weight: '1 kg', price: 120, image: '/assets/cauliflower.png'},
 { id: 3, title: 'Cucumber', weight: '1 kg', price: 120, image: '/assets/cucumber.png' },
  { id: 4, title: 'Radish', weight: '1 kg', price: 120, image: '/assets/radish.png' },
  { id: 5, title: 'Carrot', weight: '1 kg', price: 82, image:  '/assets/carrot.png'  },
  { id: 6, title: 'Tomato', weight: '1 kg', price: 82, image:  '/assets/tomato.png'},
  { id: 7, title: 'Beans', weight: '1 kg', price: 82, image: '/assets/beans.png' },
  { id: 8, title: 'Brinjal', weight: '1 kg', price: 82, image:  '/assets/brinjal.png' },
  { id: 9, title: 'Pepper', weight: '1 kg', price: 82, image:  '/assets/pepper.png' },
  { id: 10, title: 'Mushroom', weight: '1 kg', price: 82, image:  '/assets/mushroom.png'},
  { id: 11, title: 'Potato', weight: '1 kg', price: 82, image: '/assets/potato.png' },
  { id: 12, title: 'Pumpkin', weight: '1 kg', price: 82, image:  '/assets/pumpkin.png' },
  { id: 13, title: 'Corn', weight: '1 kg', price: 82, image:  '/assets/corn.png'},
  { id: 14, title: 'Onion', weight: '1 kg', price: 82, image:  '/assets/onion.png' },
  { id: 15, title: 'Apple', weight: '1 kg', price: 82, image:  '/assets/apple.png' },
  { id: 16, title: 'Banana', weight: '1 kg', price: 82, image:  '/assets/banana.png' },
  { id: 17, title: 'Grape', weight: '1 kg', price: 82, image:  '/assets/grape.png' },
  { id: 18, title: 'Mango', weight: '1 kg', price: 82, image:  '/assets/mango.png' },
  { id: 19, title: 'Orange', weight: '1 kg', price: 82, image:  '/assets/orange.png'},
  { id: 20, title: 'Melon', weight: '1 kg', price: 82, image:  '/assets/melon.png'},
  { id: 21, title: 'Pear', weight: '1 kg', price: 82, image:  '/assets/mapearngo.png'},
  { id: 22, title: 'Grenades', weight: '1 kg', price: 82, image:  '/assets/grenades.png'},
  { id: 23, title: 'Raspberry', weight: '1 kg', price: 82, image:  '/assets/raspberry.png'},
  { id: 24, title: 'Strawberry', weight: '1 kg', price: 82, image:  '/assets/strawberry.png' },
  { id: 25, title: 'Watermallon', weight: '1 kg', price: 82, image:  '/assets/strawberry.png'},
  { id: 26, title: 'Almond', weight: '1 kg', price: 82, image: almondPng '/assets/strawberry.png' },
  { id: 27, title: 'Pistachios', weight: '1 kg', price: 82, image:  '/assets/pistachios.png' },
  { id: 28, title: 'Nutsmix', weight: '1 kg', price: 82, image:  '/assets/nutsmix.png'},
  { id: 29, title: 'Cashew', weight: '1 kg', price: 82, image:  '/assets/cashew.png'},
  { id: 30, title: 'Walnuts', weight: '1 kg', price: 82, image:  '/assets/walnuts.png'},
];

interface ProductsState {
  items: Product[];
  isLoading: boolean;
}

const initialState: ProductsState = {
  items: [],
  isLoading: false,
};


export const fetchProducts = createAsyncThunk<Product[]>(
  'products/fetchProducts',
  async () => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return productsData;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      });
  },
});

export default productsSlice.reducer;
