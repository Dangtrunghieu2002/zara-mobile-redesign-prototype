import React, { createContext, useContext, useState } from 'react';
import { PRODUCTS } from '../data/products';

export const FLOWS = [
  // Part 1: Home & Menu (Tran Thi Bao Khuong · 20225027)
  { id: 'home', label: '01. Home & Landing', author: 'Khuong', tag: 'Problem #1, 2', part: 'Part 1 · Home & Menu' },
  { id: 'menu', label: '02. Main Menu Drawer', author: 'Khuong', tag: 'Problem #5', part: 'Part 1 · Home & Menu' },
  { id: 'lookbook', label: '03. Lookbook Display', author: 'Khuong', tag: 'Problem #7', part: 'Part 1 · Home & Menu' },

  // Part 2: Search & List (Le Ngoc Thuy Dung · 20225030)
  { id: 'search_typing', label: '04. Search While Typing', author: 'Dung', tag: 'Problem #8, 10', part: 'Part 2 · Search & List' },
  { id: 'search_results', label: '05. Search Results', author: 'Dung', tag: 'Problem #11', part: 'Part 2 · Search & List' },
  { id: 'filter', label: '06. Smart Filter', author: 'Dung', tag: 'Problem #12', part: 'Part 2 · Search & List' },

  // Part 3: Product Page (Pham Chi Thuan · 20225018)
  { id: 'pdp', label: '07. Product Page (PDP)', author: 'Thuan', tag: 'Problem #11-16', part: 'Part 3 · Product Page' },

  // Part 4: Bag & Checkout (Le Khanh Linh · 20225020)
  { id: 'bag', label: '08. Bag & Edit Size', author: 'Linh', tag: 'Problem #17, 22', part: 'Part 4 · Bag & Checkout' },
  { id: 'checkout', label: '09. Review & Checkout', author: 'Linh', tag: 'Problem #18, 23', part: 'Part 4 · Bag & Checkout' },
  { id: 'payment_result', label: '10. Payment Result', author: 'Linh', tag: 'Problem #19, 24', part: 'Part 4 · Bag & Checkout' },

  // Part 5: Account & Help (Dang Trung Hieu · 20225003)
  { id: 'cookie', label: '11. Cookie & Privacy', author: 'Hieu', tag: 'Problem #21', part: 'Part 5 · Account & Help' },
  { id: 'account', label: '12. Tabbed Auth & OTP', author: 'Hieu', tag: 'Problem #22-24', part: 'Part 5 · Account & Help' },
  { id: 'returns', label: '13. Returns Wizard', author: 'Hieu', tag: 'Problem #26', part: 'Part 5 · Account & Help' },
];

export const AUDIT_ANNOTATIONS = {
  // Home & Menu
  'home_pills': {
    id: 'home_pills',
    title: 'Floating Category Quick-Pills',
    author: 'Tran Thi Bao Khuong (20225027)',
    heuristic: 'Nielsen #1 (Visibility of System Status) & #6 (Recognition over Recall)',
    problem: 'Baseline: 100% full-screen editorial video monopolizes the opening view with zero shopping access points, causing cognitive freeze (~45s to locate men\'s apparel).',
    solution: 'Enhanced: Frosted-glass category pills [WOMAN] [MAN] [KIDS] [SALE %] allow direct 1-tap department entry in under 8 seconds.'
  },
  'home_navbar': {
    id: 'home_navbar',
    title: '5-Tab Standardized Navigation Bar',
    author: 'Tran Thi Bao Khuong (20225027)',
    heuristic: 'Apple HIG & Nielsen #7 (Flexibility and Efficiency of Use)',
    problem: 'Baseline: Asymmetrical 3-item text bottom bar (CATALOG, ACCOUNT, |0|) with misplaced indicator dot overlapping text and no direct Home/Search tabs.',
    solution: 'Enhanced: Standardized 5-tab navigation bar [Home, Menu, Search, Saved, Bag] with 44pt touch targets adhering to Apple Human Interface Guidelines.'
  },
  'menu_taxonomy': {
    id: 'menu_taxonomy',
    title: 'Functional-First Garment Taxonomy',
    author: 'Tran Thi Bao Khuong (20225027)',
    heuristic: 'Nielsen #2 (Match between System and Real World)',
    problem: 'Baseline: Drawer menu dominated by 8 influencer names (Marianne Smyth, Sophia Geiss...) and cryptic collaboration codes (SRPLS FLWRS), burying standard garment categories.',
    solution: 'Enhanced: Functional-first apparel taxonomy (Jackets, Coats, Blazers, Shirts...) prioritized at the top with live product counts; influencer names grouped under \'Edits\'.'
  },
  'header_safe_area': {
    id: 'header_safe_area',
    title: 'Header 44pt Apple Safe Area Insets',
    author: 'Tran Thi Bao Khuong (20225027)',
    heuristic: 'Apple HIG & WCAG 2.1 (Contrast & Clipping)',
    problem: 'Baseline: Red header text \'- SECONDHAND -\' directly collides with Dynamic Island and status bar icons on iPhone.',
    solution: 'Enhanced: Standard 44pt Apple Safe Area Inset padding added, replacing cryptic \'VIEW 1\' with responsive column layout controls.'
  },
  'lookbook_metadata': {
    id: 'lookbook_metadata',
    title: 'Lookbook Transparent Metadata & Quick-Add',
    author: 'Tran Thi Bao Khuong (20225027)',
    heuristic: 'Nielsen #1 (Visibility of System Status)',
    problem: 'Baseline: Blind browsing experience - editorial photos display without product names, prices, or color availability.',
    solution: 'Enhanced: Full metadata display with item name, localized pricing, color swatches, and a 1-tap quick add button.'
  },
  // Search & List
  'search_autocomplete': {
    id: 'search_autocomplete',
    title: 'Fix Overlapping Autocomplete Suggestions',
    author: 'Le Ngoc Thuy Dung (20225030)',
    heuristic: 'Nielsen #8 (Aesthetic and Minimalist Design)',
    problem: 'Baseline: Typing \'bead\' causes autocomplete query suggestions to collide and overlap with product thumbnails and the keyboard.',
    solution: 'Enhanced: Clear visual separation between autocomplete search queries and recommendation cards with proper spacing.'
  },
  'search_ranking': {
    id: 'search_ranking',
    title: 'Keyword Relevance Ranking',
    author: 'Le Ngoc Thuy Dung (20225030)',
    heuristic: 'Nielsen #2 (Match between System and Real World)',
    problem: 'Baseline: Querying \'bead\' returns an unrelated item (\'EMBROIDERED TOP...\') as the top result due to flawed keyword ranking.',
    solution: 'Enhanced: Algorithmic ranking prioritizes exact Product Name Matches first (Beaded Shoulder Bag, Beaded Ribbed Top, Beaded Bandeau Dress...).'
  },
  'smart_filter': {
    id: 'smart_filter',
    title: 'Collapsible Filter with Summary Chips & Result Count',
    author: 'Le Ngoc Thuy Dung (20225030)',
    heuristic: 'Nielsen #3 (User Control and Freedom) & #1 (Feedback)',
    problem: 'Baseline: Unending permanently expanded list requiring excessive scrolling, with zero active filter chips and a blind \'VIEW RESULTS\' button.',
    solution: 'Enhanced: Accordion collapsible sections, removable active summary chips (✕), and a live dynamic count button (\'VIEW 125 RESULTS\').'
  },
  // Product Page (PDP)
  'pdp_photo_ratio': {
    id: 'pdp_photo_ratio',
    title: 'Optimized 32% Photo with Interactive Zoom Controls',
    author: 'Pham Chi Thuan (20225018)',
    heuristic: 'Nielsen #8 (Aesthetic and Minimalist Design) & #6 (Recognition)',
    problem: 'Baseline: Product photo occupies 60% of vertical height, pushing product name, pricing, colorways, and purchase action off-screen.',
    solution: 'Enhanced: Optimized 32% photo ratio with interactive +/- zoom controls and pinch gesture, fitting all crucial buy elements above the fold.'
  },
  'pdp_size_inline': {
    id: 'pdp_size_inline',
    title: 'Direct On-Page Size Selection & Model Fit Info',
    author: 'Pham Chi Thuan (20225018)',
    heuristic: 'Nielsen #7 (Flexibility and Efficiency of Use)',
    problem: 'Baseline: Tapping \'ADD\' forces a disruptive bottom sheet modal just to select sizes S/M/L/XL.',
    solution: 'Enhanced: Inline size selector buttons right above the main CTA, accompanied by a size recommender and model fit information.'
  },
  'pdp_add_cta': {
    id: 'pdp_add_cta',
    title: 'High-Affordance 88px Solid ADD TO BAG CTA',
    author: 'Pham Chi Thuan (20225018)',
    heuristic: 'WCAG 2.2 AA & Nielsen #1 (Visibility of System Status)',
    problem: 'Baseline: Fragile thin-outline \'ADD\' button with weak visual affordance, failing prominent action guidelines.',
    solution: 'Enhanced: Ergonomic 88px full-width high-contrast solid black CTA with bold white typography.'
  },
  // Bag & Checkout
  'bag_edit_size': {
    id: 'bag_edit_size',
    title: '1-Tap Inline Size Selector with Inventory Warning',
    author: 'Le Khanh Linh (20225020)',
    heuristic: 'Nielsen #5 (Error Prevention) & #7 (Efficiency)',
    problem: 'Baseline: Modifying size in the bag requires a tedious 5-step process: delete item -> search again -> reopen PDP -> select new size -> add to bag.',
    solution: 'Enhanced: 1-tap inline size selector with inventory scarcity warnings (\'ONLY 2 LEFT\', \'SOLD OUT\').'
  },
  'checkout_stepper': {
    id: 'checkout_stepper',
    title: '4-Step Progress Stepper & Safe Exit',
    author: 'Le Khanh Linh (20225020)',
    heuristic: 'Nielsen #1 (Visibility of System Status) & #3 (User Freedom)',
    problem: 'Baseline: Checkout lacks step progress indication, safe exit back to bag, and suffers from cluttered typography.',
    solution: 'Enhanced: 4-step progress stepper (✓ BAG — ✓ DELIVERY — PAYMENT — DONE) with explicit \'← Back to bag\' and \'Cancel order\' links.'
  },
  'payment_honesty': {
    id: 'payment_honesty',
    title: 'Honest System Status on Payment Failure',
    author: 'Le Khanh Linh (20225020)',
    heuristic: 'Nielsen #1 (Visibility of System Status) & #9 (Help Users Recover from Errors)',
    problem: 'Baseline: Bank-declined transactions still display \'THANK YOU FOR SHOPPING AT ZARA\', causing severe user deception.',
    solution: 'Enhanced: Accurate system status \'PAYMENT CANCELLED\', reassuring users that their funds are untouched, with retry options.'
  },
  // Account & Returns
  'cookie_consent': {
    id: 'cookie_consent',
    title: 'Fair Cookie Consent & Granular GDPR Controls',
    author: 'Dang Trung Hieu (20225003)',
    heuristic: 'Nielsen #3 (User Control and Freedom) & GDPR Compliance',
    problem: 'Baseline: Forced dark pattern with only a single \'CONTINUE\' button, providing zero option to decline tracking cookies.',
    solution: 'Enhanced: Equal-weight \'REJECT NON-ESSENTIAL\' button alongside \'ACCEPT ALL\', with 3-tier granular GDPR consent settings.'
  },
  'auth_tabs': {
    id: 'auth_tabs',
    title: 'Tabbed Onboarding with Live RFC 5322 Email Validation',
    author: 'Dang Trung Hieu (20225003)',
    heuristic: 'Nielsen #5 (Error Prevention) & #1 (Feedback)',
    problem: 'Baseline: Ambiguous single field \'LOG IN OR REGISTER\' leaving users unaware if an account exists, with no live validation.',
    solution: 'Enhanced: Dedicated [LOG IN] and [REGISTER] tabs, instant RFC 5322 email validation checkmark, and a 3-tier password strength meter.'
  },
  'returns_stepper': {
    id: 'returns_stepper',
    title: '4-Step Returns Wizard & 30-Day Countdown Badge',
    author: 'Dang Trung Hieu (20225003)',
    heuristic: 'Nielsen #9 (Help Users Recover) & #1 (Visibility of Status)',
    problem: 'Baseline: Static dead-end \'THERE ARE NO ACTIVE RETURNS AT THIS TIME\' offering no return window info or drop-off guidelines.',
    solution: 'Enhanced: Guided 4-step returns wizard (Items -> Reason -> Drop-off -> QR Code) with a 24-day countdown badge and drop-off map.'
  }
};

const FlowContext = createContext();

export const FlowProvider = ({ children }) => {
  const [currentFlow, setCurrentFlow] = useState('home');
  const [leftFlow, setLeftFlow] = useState('home');
  const [rightFlow, setRightFlow] = useState('home');
  const [leftHistory, setLeftHistory] = useState(['home']);
  const [rightHistory, setRightHistory] = useState(['home']);
  const [deviceType, setDeviceType] = useState('iphone'); // 'iphone' | 'android'
  const [mirrorMode, setMirrorMode] = useState(true);
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [activeAnnotationId, setActiveAnnotationId] = useState(null);
  const [scale, setScale] = useState(0.85);

  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS.wool_coat);
  const [selectedDepartment, setSelectedDepartment] = useState('woman'); // 'woman' | 'man' | 'kids' | 'sale'
  const [searchQuery, setSearchQuery] = useState('bead');

  // Micro-states across flows
  const [pdpState, setPdpState] = useState({
    selectedSize: 'M',
    selectedColor: 'Taupe grey',
    colorFilterStyle: 'none',
    selectedImage: './products/real_wool_coat.jpg',
    zoomLevel: 1,
    openAccordion: 'description',
  });

  const [bagState, setBagState] = useState({
    isSizeSheetOpen: false,
    selectedSize: 'M',
    quantity: 1,
    items: [
      {
        id: 'jacket_1',
        productId: 'leather_jacket',
        name: 'LEATHER EFFECT JACKET',
        color: 'BLACK',
        size: 'M',
        price: '$119.00',
        priceNum: 119,
        quantity: 1,
        image: './products/real_leather_jacket.jpg',
        stock: 'available',
      }
    ]
  });

  const [wishlist, setWishlist] = useState(['wool_coat']);

  // Apple Dynamic Island Live Activity state
  const [liveActivity, setLiveActivity] = useState(null);
  const triggerLiveActivity = (title, subtitle = '') => {
    setLiveActivity({ title, subtitle });
    setTimeout(() => setLiveActivity(null), 3200);
  };

  const [searchState, setSearchState] = useState({
    query: 'bead',
    isTyping: true,
    viewMode: 2, // 1, 2, or 3 columns
    selectedSort: 'relevance',
  });

  const [filterState, setFilterState] = useState({
    isOpen: false,
    selectedSort: 'relevance', // 'relevance' | 'price_asc' | 'price_desc'
    selectedCategories: [], // array of category names
    selectedColors: [], // array of color names
    onlySale: false,
  });

  const [cookieState, setCookieState] = useState({
    isModalOpen: true,
    showGranular: false,
    functional: true,
    analytics: false,
  });

  const [authState, setAuthState] = useState({
    tab: 'login', // 'login' | 'register'
    email: 'd.trunghieu@gmail.com',
    isValidEmail: true,
    passwordStrength: 3,
    otpCode: ['9', '7', '0', '0', '2', '3'],
    otpError: false,
  });

  const [returnsState, setReturnsState] = useState({
    currentStep: 3, // 1: Items, 2: Reason, 3: Drop-off, 4: QR Code
    daysLeft: 24,
    selectedItem: 'WOOL BLEND COAT - SIZE M',
    selectedStore: 'ZARA VINCOM DONG KHOI',
    distance: '1.2 KM AWAY',
  });

  // Logical Hierarchical Back Fallback Mapping (when history stack is empty)
  const HIERARCHICAL_BACK = {
    payment_result: 'checkout',
    checkout: 'bag',
    bag: 'pdp',
    pdp: 'search_results',
    filter: 'search_results',
    search_results: 'search_typing',
    search_typing: 'home',
    returns: 'account',
    account: 'home',
    menu: 'home',
    lookbook: 'home',
    cookie: 'home',
    home: null,
  };

  // Synchronized navigation function with history recording
  const navigateTo = (flowId, source = 'system') => {
    if (mirrorMode) {
      if (currentFlow !== flowId) {
        setLeftHistory(prev => [...prev.slice(-20), currentFlow]);
        setRightHistory(prev => [...prev.slice(-20), currentFlow]);
      }
      setCurrentFlow(flowId);
      setLeftFlow(flowId);
      setRightFlow(flowId);
    } else {
      if (source === 'left') {
        if (leftFlow !== flowId) {
          setLeftHistory(prev => [...prev.slice(-20), leftFlow]);
        }
        setLeftFlow(flowId);
      } else if (source === 'right') {
        if (rightFlow !== flowId) {
          setRightHistory(prev => [...prev.slice(-20), rightFlow]);
        }
        setRightFlow(flowId);
      } else {
        if (currentFlow !== flowId) {
          setLeftHistory(prev => [...prev.slice(-20), currentFlow]);
          setRightHistory(prev => [...prev.slice(-20), currentFlow]);
        }
        setCurrentFlow(flowId);
        setLeftFlow(flowId);
        setRightFlow(flowId);
      }
    }
  };

  const goBack = (side = 'left') => {
    const isLeft = side === 'left';
    const activeFlow = mirrorMode ? currentFlow : (isLeft ? leftFlow : rightFlow);
    const history = isLeft ? leftHistory : rightHistory;

    // 1. Try popping from actual history stack
    if (history && history.length > 0) {
      let targetIndex = history.length - 1;
      while (targetIndex >= 0 && history[targetIndex] === activeFlow) {
        targetIndex--;
      }
      if (targetIndex >= 0) {
        const prevFlow = history[targetIndex];
        const newHistory = history.slice(0, targetIndex);
        if (mirrorMode) {
          setLeftHistory(newHistory);
          setRightHistory(newHistory);
          setCurrentFlow(prevFlow);
          setLeftFlow(prevFlow);
          setRightFlow(prevFlow);
        } else {
          if (isLeft) {
            setLeftHistory(newHistory);
            setLeftFlow(prevFlow);
          } else {
            setRightHistory(newHistory);
            setRightFlow(prevFlow);
          }
        }
        return { success: true, target: prevFlow, isAtRoot: false };
      }
    }

    // 2. If history is empty, use logical hierarchical fallback
    const fallbackTarget = HIERARCHICAL_BACK[activeFlow];
    if (fallbackTarget && fallbackTarget !== activeFlow) {
      navigateTo(fallbackTarget, side);
      return { success: true, target: fallbackTarget, isAtRoot: false };
    }

    // 3. User is already at the root screen (home)
    return { success: false, target: activeFlow, isAtRoot: true };
  };

  const goHome = (side = 'left') => {
    navigateTo('home', side);
  };

  const goToNextFlow = () => {
    const currentIndex = FLOWS.findIndex(f => f.id === currentFlow);
    if (currentIndex < FLOWS.length - 1) {
      navigateTo(FLOWS[currentIndex + 1].id, 'system');
    }
  };

  const goToPrevFlow = () => {
    const currentIndex = FLOWS.findIndex(f => f.id === currentFlow);
    if (currentIndex > 0) {
      navigateTo(FLOWS[currentIndex - 1].id, 'system');
    }
  };

  const selectDepartment = (dept, side = 'system') => {
    setSelectedDepartment(dept);
  };

  const selectPdpColor = (colorName) => {
    if (!selectedProduct?.availableColors) return;
    const match = selectedProduct.availableColors.find(c => c.name === colorName);
    if (match) {
      setPdpState(prev => ({
        ...prev,
        selectedColor: match.name,
        colorFilterStyle: match.filterStyle || 'none',
        selectedImage: match.image || selectedProduct.image,
      }));
      triggerLiveActivity('Colorway Selected', match.name);
    }
  };

  const toggleCategoryFilter = (cat) => {
    setFilterState(prev => {
      const exists = prev.selectedCategories.includes(cat);
      return {
        ...prev,
        selectedCategories: exists
          ? prev.selectedCategories.filter(c => c !== cat)
          : [...prev.selectedCategories, cat]
      };
    });
  };

  const toggleColorFilter = (colName) => {
    setFilterState(prev => {
      const exists = prev.selectedColors.includes(colName);
      return {
        ...prev,
        selectedColors: exists
          ? prev.selectedColors.filter(c => c !== colName)
          : [...prev.selectedColors, colName]
      };
    });
  };

  const setSortFilter = (sortOption) => {
    setFilterState(prev => ({ ...prev, selectedSort: sortOption }));
  };

  const setOnlySaleFilter = (boolVal) => {
    setFilterState(prev => ({ ...prev, onlySale: boolVal }));
  };

  const clearAllFilters = () => {
    setFilterState({
      isOpen: false,
      selectedSort: 'relevance',
      selectedCategories: [],
      selectedColors: [],
      onlySale: false,
    });
  };

  const getFilteredProducts = (overrideDept = null) => {
    const dept = overrideDept || selectedDepartment;
    let list = [];
    if (dept === 'sale') {
      list = Object.values(PRODUCTS).filter(p => p.onSale);
    } else {
      list = Object.values(PRODUCTS).filter(p => p.department === dept);
    }

    // Filter by search query if any
    if (searchQuery && searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase().trim();
      const matched = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.color.toLowerCase().includes(q)
      );
      if (matched.length > 0) {
        list = matched;
      }
    }

    // Filter by selectedCategories
    if (filterState.selectedCategories && filterState.selectedCategories.length > 0) {
      list = list.filter(p => filterState.selectedCategories.includes(p.category));
    }

    // Filter by selectedColors
    if (filterState.selectedColors && filterState.selectedColors.length > 0) {
      list = list.filter(p => {
        const pColors = p.availableColors ? p.availableColors.map(c => c.name.toLowerCase()) : [p.color.toLowerCase()];
        return filterState.selectedColors.some(filterCol =>
          pColors.some(cName => cName.includes(filterCol.toLowerCase()) || filterCol.toLowerCase().includes(cName))
        );
      });
    }

    // Filter by onlySale
    if (filterState.onlySale) {
      list = list.filter(p => p.onSale);
    }

    // Apply sorting
    if (filterState.selectedSort === 'price_asc') {
      list = [...list].sort((a, b) => a.priceNum - b.priceNum);
    } else if (filterState.selectedSort === 'price_desc') {
      list = [...list].sort((a, b) => b.priceNum - a.priceNum);
    }

    return list;
  };

  const handleVirtualKeyPress = (key, side = 'right') => {
    if (key === 'BACKSPACE' || key === '⌫') {
      setSearchQuery(prev => prev.slice(0, -1));
    } else if (key === 'SPACE') {
      setSearchQuery(prev => prev + ' ');
    } else if (key === 'CLEAR') {
      setSearchQuery('');
    } else if (key === 'SEARCH') {
      navigateTo('search_results', side);
    } else {
      setSearchQuery(prev => prev + key.toLowerCase());
    }
  };

  const viewProduct = (productId, side = 'left') => {
    const prod = PRODUCTS[productId] || PRODUCTS.wool_coat;
    setSelectedProduct(prod);
    const defaultColor = prod.availableColors?.[0]?.name || prod.color;
    const defaultFilter = prod.availableColors?.[0]?.filterStyle || 'none';
    setPdpState(prev => ({
      ...prev,
      selectedSize: prod.defaultSize || 'M',
      selectedColor: defaultColor,
      colorFilterStyle: defaultFilter,
      selectedImage: prod.availableColors?.[0]?.image || prod.image,
      zoomLevel: 1,
    }));
    navigateTo('pdp', side);
  };

  const addToBag = (product = selectedProduct, size = null, color = null, side = 'left') => {
    const chosenProduct = typeof product === 'string' ? (PRODUCTS[product] || selectedProduct) : (product || selectedProduct);
    const chosenSize = size || pdpState.selectedSize || chosenProduct.defaultSize || 'M';
    const chosenColor = color || pdpState.selectedColor || chosenProduct.color;
    const chosenImage = pdpState.selectedImage || chosenProduct.image;
    setBagState(prev => {
      const existingIdx = prev.items.findIndex(
        i => i.productId === chosenProduct.id && i.size === chosenSize && i.color === chosenColor
      );
      let newItems;
      if (existingIdx >= 0) {
        newItems = prev.items.map((it, idx) =>
          idx === existingIdx ? { ...it, quantity: (it.quantity || 1) + 1 } : it
        );
      } else {
        const newItem = {
          id: `${chosenProduct.id}_${Date.now()}`,
          productId: chosenProduct.id,
          name: chosenProduct.name,
          color: chosenColor,
          size: chosenSize,
          price: chosenProduct.price || '$129.00',
          priceNum: chosenProduct.priceNum || 129,
          image: chosenImage,
          quantity: 1,
          stock: 'available',
        };
        newItems = [newItem, ...prev.items];
      }
      return {
        ...prev,
        selectedSize: chosenSize,
        items: newItems
      };
    });
    triggerLiveActivity('Added to Bag', `${chosenProduct.name} · ${chosenSize}`);
    navigateTo('bag', side);
  };

  const updateBagQuantity = (itemId, delta) => {
    setBagState(prev => {
      const updated = prev.items
        .map(item => {
          if (item.id === itemId || item.productId === itemId) {
            const nextQty = (item.quantity || 1) + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean);
      return {
        ...prev,
        items: updated
      };
    });
    triggerLiveActivity('Cart Updated', delta > 0 ? '+1 Quantity' : '-1 Quantity');
  };

  const removeFromBag = (itemId) => {
    setBagState(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== itemId && item.productId !== itemId)
    }));
    triggerLiveActivity('Item Removed', 'Updated bag total');
  };

  const updateItemSize = (itemId, newSize) => {
    setBagState(prev => ({
      ...prev,
      selectedSize: newSize,
      items: prev.items.map(item =>
        item.id === itemId || item.productId === itemId ? { ...item, size: newSize } : item
      )
    }));
    triggerLiveActivity('Size Updated', `Size ${newSize}`);
  };

  const quickAddToBag = (productOrId) => {
    const prod = typeof productOrId === 'string' ? (PRODUCTS[productOrId] || PRODUCTS.wool_coat) : productOrId;
    setBagState(prev => {
      const existing = prev.items.find(i => i.productId === prod.id);
      if (existing) {
        return {
          ...prev,
          items: prev.items.map(i =>
            i.productId === prod.id ? { ...i, quantity: (i.quantity || 1) + 1 } : i
          )
        };
      }
      const newItem = {
        id: `${prod.id}_${Date.now()}`,
        productId: prod.id,
        name: prod.name,
        color: prod.color || 'Default',
        size: prod.defaultSize || 'M',
        price: prod.price || '$129.00',
        priceNum: prod.priceNum || 129,
        image: prod.image,
        quantity: 1,
        stock: 'available',
      };
      return {
        ...prev,
        items: [newItem, ...prev.items]
      };
    });
    triggerLiveActivity('Added to Bag', `${prod.name}`);
  };

  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      const next = exists ? prev.filter(id => id !== productId) : [...prev, productId];
      triggerLiveActivity(exists ? 'Removed from Wishlist' : 'Saved to Wishlist', PRODUCTS[productId]?.name || '');
      return next;
    });
  };

  const getCartSubtotal = () => {
    if (!bagState?.items || bagState.items.length === 0) return 0;
    return bagState.items.reduce((sum, item) => sum + (item.priceNum || 0) * (item.quantity || 1), 0);
  };

  const getCartItemCount = () => {
    if (!bagState?.items || bagState.items.length === 0) return 0;
    return bagState.items.reduce((sum, item) => sum + (item.quantity || 1), 0);
  };

  const handleLeftAction = (actionType, payload) => {
    if (actionType === 'navigate') {
      navigateTo(payload, 'left');
    } else if (actionType === 'viewProduct') {
      viewProduct(payload, 'left');
    } else if (actionType === 'addToBag') {
      addToBag(payload?.product || payload, payload?.size, payload?.color, 'left');
    } else if (actionType === 'updateQuantity') {
      updateBagQuantity(payload.id || payload, payload.delta || 1);
    } else if (actionType === 'removeFromBag') {
      removeFromBag(payload);
    } else if (actionType === 'updateSize') {
      updateItemSize(payload.id, payload.size);
    } else if (actionType === 'quickAddToBag') {
      quickAddToBag(payload);
    } else if (actionType === 'toggleWishlist') {
      toggleWishlist(payload);
    } else if (actionType === 'selectColor') {
      selectPdpColor(payload);
    } else if (actionType === 'selectDepartment') {
      selectDepartment(payload, 'left');
    } else if (actionType === 'virtualKey') {
      handleVirtualKeyPress(payload, 'left');
    } else if (actionType === 'back') {
      return goBack('left');
    } else if (actionType === 'home') {
      goHome('left');
    }
  };

  const handleRightAction = (actionType, payload) => {
    if (actionType === 'navigate') {
      navigateTo(payload, 'right');
    } else if (actionType === 'viewProduct') {
      viewProduct(payload, 'right');
    } else if (actionType === 'addToBag') {
      addToBag(payload?.product || payload, payload?.size, payload?.color, 'right');
    } else if (actionType === 'updateQuantity') {
      updateBagQuantity(payload.id || payload, payload.delta || 1);
    } else if (actionType === 'removeFromBag') {
      removeFromBag(payload);
    } else if (actionType === 'updateSize') {
      updateItemSize(payload.id, payload.size);
    } else if (actionType === 'quickAddToBag') {
      quickAddToBag(payload);
    } else if (actionType === 'toggleWishlist') {
      toggleWishlist(payload);
    } else if (actionType === 'selectColor') {
      selectPdpColor(payload);
    } else if (actionType === 'selectDepartment') {
      selectDepartment(payload, 'right');
    } else if (actionType === 'virtualKey') {
      handleVirtualKeyPress(payload, 'right');
    } else if (actionType === 'back') {
      return goBack('right');
    } else if (actionType === 'home') {
      goHome('right');
    }
  };

  return (
    <FlowContext.Provider
      value={{
        currentFlow,
        FLOWS,
        PRODUCTS,
        selectedProduct,
        setSelectedProduct,
        viewProduct,
        addToBag,
        goToNextFlow,
        goToPrevFlow,
        leftFlow: mirrorMode ? currentFlow : leftFlow,
        rightFlow: mirrorMode ? currentFlow : rightFlow,
        navigateTo,
        deviceType,
        setDeviceType,
        mirrorMode,
        setMirrorMode,
        showAnnotations,
        setShowAnnotations,
        activeAnnotationId,
        setActiveAnnotationId,
        activeAnnotation: AUDIT_ANNOTATIONS[activeAnnotationId] || null,
        scale,
        setScale,
        // New dynamic interactivity states
        selectedDepartment,
        setSelectedDepartment,
        selectDepartment,
        searchQuery,
        setSearchQuery,
        handleVirtualKeyPress,
        selectPdpColor,
        // Filter actions & helpers
        toggleCategoryFilter,
        toggleColorFilter,
        setSortFilter,
        setOnlySaleFilter,
        clearAllFilters,
        getFilteredProducts,
        // Micro states
        pdpState,
        setPdpState,
        bagState,
        setBagState,
        searchState,
        setSearchState,
        filterState,
        setFilterState,
        cookieState,
        setCookieState,
        authState,
        setAuthState,
        returnsState,
        setReturnsState,
        wishlist,
        toggleWishlist,
        updateBagQuantity,
        removeFromBag,
        updateItemSize,
        quickAddToBag,
        getCartSubtotal,
        getCartItemCount,
        liveActivity,
        triggerLiveActivity,
        handleLeftAction,
        handleRightAction,
        goBack,
        goHome,
        leftHistory,
        rightHistory,
      }}
    >
      {children}
    </FlowContext.Provider>
  );
};

export const useFlow = () => useContext(FlowContext);
