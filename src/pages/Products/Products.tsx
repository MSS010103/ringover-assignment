import { useState } from 'react';
import './Products.scss';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  status: 'In Stock' | 'Out of stock';
  icon: string;
  company: {
    name: string;
    logo: string;
  };
}

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z" stroke="#AEB9E1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17.5 17.5L13.875 13.875" stroke="#AEB9E1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Products = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Watch',
      description: 'Accessories',
      price: 20,
      category: 'Accessories',
      status: 'In Stock',
      icon: '/product-icons/watch.png',
      company: {
        name: 'Google',
        logo: '/company-logos/Google.png'
      }
    },
    {
      id: '2',
      name: 'Mobile',
      description: 'Telecommunication',
      price: 500,
      category: 'Telecommunication',
      status: 'Out of stock',
      icon: '/product-icons/mobile.png',
      company: {
        name: 'Webflow',
        logo: '/company-logos/webflow.png'
      }
    },
    {
      id: '3',
      name: 'Laptop',
      description: 'Note Book',
      price: 800,
      category: 'Note Book',
      status: 'Out of stock',
      icon: '/product-icons/laptop.png',
      company: {
        name: 'Facebook',
        logo: '/company-logos/Facebook.png'
      }
    },
    {
      id: '4',
      name: 'TV',
      description: 'Digital',
      price: 250,
      category: 'Digital',
      status: 'In Stock',
      icon: '/product-icons/television.jpg',
      company: {
        name: 'Twitter',
        logo: '/company-logos/Twitter.png'
      }
    },
    {
      id: '5',
      name: 'Camera',
      description: 'Digital',
      price: 100,
      category: 'Digital',
      status: 'Out of stock',
      icon: '/product-icons/camera.png',
      company: {
        name: 'YouTube',
        logo: '/company-logos/Youtube.png'
      }
    },
    {
      id: '6',
      name: 'Perfume',
      description: 'Cosmetics',
      price: 25,
      category: 'Cosmetics',
      status: 'In Stock',
      icon: '/product-icons/perfume.png',
      company: {
        name: 'Reddit',
        logo: '/company-logos/Reddit.png'
      }
    },
    {
      id: '7',
      name: 'Ear pods',
      description: 'Digital',
      price: 45,
      category: 'Digital',
      status: 'Out of stock',
      icon: '/product-icons/earpods.png',
      company: {
        name: 'Spotify',
        logo: '/company-logos/Spotify.png'
      }
    },
    {
      id: '8',
      name: 'Wireless Charger',
      description: 'Digital',
      price: 10,
      category: 'Digital',
      status: 'In Stock',
      icon: '/product-icons/wc.png',
      company: {
        name: 'Pinterest',
        logo: '/company-logos/Pinterest.png'
      }
    },
    {
      id: '9',
      name: 'Torch',
      description: 'Light',
      price: 20,
      category: 'Light',
      status: 'Out of stock',
      icon: '/product-icons/torch.png',
      company: {
        name: 'Twitch',
        logo: '/company-logos/Twitch.png'
      }
    }
  ]);

  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProducts(products.map(p => p.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (productId: string, checked: boolean) => {
    if (checked) {
      setSelectedProducts([...selectedProducts, productId]);
    } else {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    }
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoDelete = () => {
    setUploadedPhoto(null);
  };

  const columns = [
    {
      key: 'checkbox',
      render: (record: Product) => (
        <div className="column checkbox">
          <input 
            type="checkbox"
            checked={selectedProducts.includes(record.id)}
            onChange={(e) => handleSelectProduct(record.id, e.target.checked)}
          />
        </div>
      ),
    },
    {
      key: 'name',
      title: 'Product Name',
      render: (record: Product) => (
        <div className="column name">
          <img src={record.icon} alt={record.name} className="product-icon" />
          <div className="product-info">
            <span className="product-name">{record.name}</span>
            <span className="product-description">{record.description}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'category',
      title: 'Category',
      render: (record: Product) => (
        <div className="column category">{record.category}</div>
      ),
    },
    {
      key: 'price',
      title: 'Price',
      render: (record: Product) => (
        <div className="column price">${record.price}</div>
      ),
    },
    {
      key: 'company',
      title: 'Company',
      render: (record: Product) => (
        <div className="column company">
          <img src={record.company.logo} alt={record.company.name} className="company-logo" />
          <span>{record.company.name}</span>
        </div>
      ),
    },
    {
      key: 'status',
      title: 'Status',
      render: (record: Product) => (
        <div className="status-cell">
          <span className={`status-indicator ${record.status === 'In Stock' ? 'in-stock' : 'out-of-stock'}`}>
            {record.status}
          </span>
        </div>
      ),
    },
    {
      key: 'actions',
      render: (record: Product) => (
        <div className="actions-cell">
          <button onClick={() => handleEditProduct(record)}>
            <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.0947 1.99892C10.9244 1.82932 10.7221 1.69516 10.4997 1.60417C10.2772 1.51318 10.0389 1.46716 9.79856 1.46879C9.55822 1.47042 9.32057 1.51965 9.09936 1.61365C8.87815 1.70764 8.67776 1.84453 8.50975 2.01642L1.64715 8.87912C1.3937 9.13258 1.21301 9.44949 1.12401 9.79671L0.542819 12.0641C0.467311 12.3586 0.735111 12.6264 1.02967 12.5508L3.29714 11.9693C3.64426 11.8802 3.96108 11.6996 4.21448 11.4462L11.0772 4.58338C11.2491 4.41545 11.386 4.2151 11.4801 3.99392C11.5741 3.77275 11.6233 3.53512 11.625 3.2948C11.6266 3.05447 11.5806 2.8162 11.4895 2.59377C11.3985 2.37134 11.2643 2.16916 11.0947 1.99892Z" fill="#AEB9E1" stroke="#AEB9E1" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button onClick={() => handleDeleteProduct(record.id)}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.1483 11.9359C11.1131 12.4611 10.6769 12.869 10.1506 12.869H3.84163C3.31534 12.869 2.87912 12.4611 2.84387 11.936L2.27734 3.49451H11.7142L11.1483 11.9359Z" fill="#AEB9E1" stroke="#AEB9E1" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M1 3.49548H13" stroke="#AEB9E1" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M8.52789 1.3186H5.46852C5.19806 1.3186 4.93867 1.43321 4.74742 1.63721C4.55617 1.8412 4.44873 2.11788 4.44873 2.40638V3.49416H9.54768V2.40638C9.54768 2.11788 9.44024 1.8412 9.24899 1.63721C9.05775 1.43321 8.79836 1.3186 8.52789 1.3186Z" stroke="#AEB9E1" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="products-page">
      <div className="products-header">
        <div className="left-section">
          <h1>Product List</h1>
          <div className="search-bar">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search for product..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <button className="add-product-button" onClick={handleAddProduct}>
          Add New Product
        </button>
      </div>

      <div className="products-container">
        <div className="products-header-section">
          <h2>All Products</h2>
          <span className="product-count">
            <span className="highlight">1 - 9</span> of 256
          </span>
        </div>

        <div className="products-list">
          <div className="list-header">
            <div className="column checkbox">
              <input 
                type="checkbox"
                checked={selectedProducts.length === products.length}
                onChange={(e) => handleSelectAll(e.target.checked)}
              />
            </div>
            <div className="column name">
              Product Name
              <svg className="sort-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 10L12 15L17 10H7Z" fill="currentColor"/>
              </svg>
            </div>
            <div className="column category">
              Category
              <svg className="sort-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 10L12 15L17 10H7Z" fill="currentColor"/>
              </svg>
            </div>
            <div className="column price">
              Price
              <svg className="sort-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 10L12 15L17 10H7Z" fill="currentColor"/>
              </svg>
            </div>
            <div className="column company">
              Company
              <svg className="sort-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 10L12 15L17 10H7Z" fill="currentColor"/>
              </svg>
            </div>
            <div className="column status">
              Status
              <svg className="sort-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 10L12 15L17 10H7Z" fill="currentColor"/>
              </svg>
            </div>
            <div className="column actions"></div>
          </div>

          {products.map(product => (
            <div key={product.id} className="list-item">
              <div className="column checkbox">
                <input 
                  type="checkbox"
                  checked={selectedProducts.includes(product.id)}
                  onChange={(e) => handleSelectProduct(product.id, e.target.checked)}
                />
              </div>
              <div className="column name">
                <img src={product.icon} alt={product.name} className="product-icon" />
                <div className="product-info">
                  <span className="product-name">{product.name}</span>
                  <span className="product-description">{product.description}</span>
                </div>
              </div>
              <div className="column category">{product.category}</div>
              <div className="column price">${product.price}</div>
              <div className="column company">
                <img src={product.company.logo} alt={product.company.name} className="company-logo" />
                <span>{product.company.name}</span>
              </div>
              <div className="column status">
                <div className="status-cell">
                  <span className={`status-indicator ${product.status === 'In Stock' ? 'in-stock' : 'out-of-stock'}`}>
                    {product.status}
                  </span>
                </div>
              </div>
              <div className="column actions">
                <div className="actions-cell">
                  <button onClick={() => handleEditProduct(product)}>
                    <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.0947 1.99892C10.9244 1.82932 10.7221 1.69516 10.4997 1.60417C10.2772 1.51318 10.0389 1.46716 9.79856 1.46879C9.55822 1.47042 9.32057 1.51965 9.09936 1.61365C8.87815 1.70764 8.67776 1.84453 8.50975 2.01642L1.64715 8.87912C1.3937 9.13258 1.21301 9.44949 1.12401 9.79671L0.542819 12.0641C0.467311 12.3586 0.735111 12.6264 1.02967 12.5508L3.29714 11.9693C3.64426 11.8802 3.96108 11.6996 4.21448 11.4462L11.0772 4.58338C11.2491 4.41545 11.386 4.2151 11.4801 3.99392C11.5741 3.77275 11.6233 3.53512 11.625 3.2948C11.6266 3.05447 11.5806 2.8162 11.4895 2.59377C11.3985 2.37134 11.2643 2.16916 11.0947 1.99892Z" fill="#AEB9E1" stroke="#AEB9E1" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                  <button onClick={() => handleDeleteProduct(product.id)}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.1483 11.9359C11.1131 12.4611 10.6769 12.869 10.1506 12.869H3.84163C3.31534 12.869 2.87912 12.4611 2.84387 11.936L2.27734 3.49451H11.7142L11.1483 11.9359Z" fill="#AEB9E1" stroke="#AEB9E1" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M1 3.49548H13" stroke="#AEB9E1" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M8.52789 1.3186H5.46852C5.19806 1.3186 4.93867 1.43321 4.74742 1.63721C4.55617 1.8412 4.44873 2.11788 4.44873 2.40638V3.49416H9.54768V2.40638C9.54768 2.11788 9.44024 1.8412 9.24899 1.63721C9.05775 1.43321 8.79836 1.3186 8.52789 1.3186Z" stroke="#AEB9E1" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="products-footer">
          <div className="pagination-info">
            1 - 10 of 460
          </div>
          <div className="right-section">
            <div className="rows-per-page">
              Rows per page: 
              <select defaultValue="9">
                <option value="9">9</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </div>
            <div className="pagination-controls">
              <button className="prev-page">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.31445 2.06458L12.25 7.00008L7.31445 11.9356" stroke="#7E89AC" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12.25 7L1.75 7" stroke="#7E89AC" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button className="next-page">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.75 7L12.25 7" stroke="#7E89AC" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7.31445 2.06458L12.25 7.00008L7.31445 11.9356" stroke="#7E89AC" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="product-modal">
            <div className="modal-header">
              <h2>Add new product</h2>
              <button className="close-button" onClick={() => setIsModalOpen(false)}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor"/>
                </svg>
              </button>
            </div>
            
            <form className="product-form">
              <div className="form-group">
                <div className="field-header">
                  <label>Product name</label>
                  <input 
                    type="text" 
                    placeholder="Master Input Text"
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="field-header">
                  <label>Product photo</label>
                </div>
                <div className="photo-upload">
                  <div className="upload-area">
                    <svg className="upload-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="currentColor"/>
                    </svg>
                    <div className="upload-text">
                      <div className="primary-text">Click to upload or drag and drop</div>
                      <div className="secondary-text">SVG, PNG, JPG or GIF (max. 800 x 400px)</div>
                    </div>
                    <input 
                      type="file" 
                      id="photo-upload"
                      accept="image/*" 
                      onChange={handlePhotoUpload}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <div className="field-header">
                  <label>Category</label>
                  <select defaultValue="Accessories">
                    <option value="Accessories">Accessories</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Cosmetics">Cosmetics</option>
                    <option value="Telecommunication">Telecommunication</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <div className="field-header">
                  <label>Price (in $)</label>
                  <input 
                    type="number" 
                    placeholder="$15"
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="field-header">
                  <label>Company</label>
                  <select defaultValue="">
                    <option value="" disabled>Google</option>
                    <option value="Google">Google</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Twitter">Twitter</option>
                    <option value="Pinterest">Pinterest</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <div className="field-header">
                  <label>Status</label>
                  <select defaultValue="In Stock">
                    <option value="In Stock">In Stock</option>
                    <option value="Out of stock">Out of stock</option>
                  </select>
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="save-button">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products; 