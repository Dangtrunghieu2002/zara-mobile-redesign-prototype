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
    problem: 'Bản gốc: 100% video lookbook choán hết trang mở đầu, không có bất kỳ điểm truy cập mua sắm nào khiến người dùng bối rối (cognitive freeze) phải mất ~45 giây mới tìm được đồ nam.',
    solution: 'Bản cải tiến: Đặt các pill danh mục nổi bật [WOMAN] [MAN] [KIDS] [SALE %] hiệu ứng kính mờ (frosted-glass) ngay trên landing, giúp vào thẳng ngành hàng chỉ trong 1 chạm (8 giây).'
  },
  'home_navbar': {
    id: 'home_navbar',
    title: '5-Tab Standardized Navigation Bar',
    author: 'Tran Thi Bao Khuong (20225027)',
    heuristic: 'Apple HIG & Nielsen #7 (Flexibility and Efficiency of Use)',
    problem: 'Bản gốc: Thanh tab bar đáy chỉ có 3 mục lệch lạc (DANH MỤC, TÀI KHOẢN, |0|), dấu chấm định vị đè lên chữ, thiếu icon Home và Search trực tiếp.',
    solution: 'Bản cải tiến: Chuẩn hóa 5 tab rõ ràng [Home, Menu, Search, Saved, Bag] với icon và vi-nhãn 44pt theo Apple Human Interface Guidelines.'
  },
  'menu_taxonomy': {
    id: 'menu_taxonomy',
    title: 'Functional-First Garment Taxonomy',
    author: 'Tran Thi Bao Khuong (20225027)',
    heuristic: 'Nielsen #2 (Match between System and Real World)',
    problem: 'Bản gốc: Menu drawer bị chiếm dụng bởi 8 tên influencer cá nhân (Marianne Smyth, Sophia Geiss...) và mã collab khó hiểu (SRPLS FLWRS), giấu danh mục quần áo xuống dưới.',
    solution: 'Bản cải tiến: Đưa danh mục thường ngày (Jackets, Coats, Blazers, Shirts...) lên vị trí ưu tiên số 1 kèm số lượng sản phẩm (142, 68...); gộp tên KOL vào thư mục con Edits.'
  },
  'header_safe_area': {
    id: 'header_safe_area',
    title: 'Header 44pt Apple Safe Area Insets',
    author: 'Tran Thi Bao Khuong (20225027)',
    heuristic: 'Apple HIG & WCAG 2.1 (Contrast & Clipping)',
    problem: 'Bản gốc: Chữ tiêu đề đỏ "- SECONDHAND -" va chạm trực tiếp với Dynamic Island và thanh đồng hồ pin trên iPhone.',
    solution: 'Bản cải tiến: Thêm đệm Safe Area Inset 44pt chuẩn, chuyển nút "HIỂN THỊ 1" thành cụm icon đổi view cột trực quan.'
  },
  'lookbook_metadata': {
    id: 'lookbook_metadata',
    title: 'Lookbook Transparent Metadata & Quick-Add',
    author: 'Tran Thi Bao Khuong (20225027)',
    heuristic: 'Nielsen #1 (Visibility of System Status)',
    problem: 'Bản gốc: Lookbook duyệt ảnh "mù" (Blind browsing) - chỉ hiển thị ảnh người mẫu, không hề có tên áo, giá tiền hay màu sắc.',
    solution: 'Bản cải tiến: Hiển thị đầy đủ tên sản phẩm, giá VND ($ quy đổi), bảng màu (swatches) và nút "+" thêm nhanh không cần mở trang chi tiết.'
  },
  // Search & List
  'search_autocomplete': {
    id: 'search_autocomplete',
    title: 'Fix Overlapping Autocomplete Suggestions',
    author: 'Le Ngoc Thuy Dung (20225030)',
    heuristic: 'Nielsen #8 (Aesthetic and Minimalist Design)',
    problem: 'Bản gốc: Khi gõ "bead", các gợi ý autocomplete bị đè chồng chéo lên nhau và đè thẳng lên cả sản phẩm bên dưới cũng như bàn phím.',
    solution: 'Bản cải tiến: Tách bạch rõ ràng giữa thanh gợi ý từ khóa (beaded, beaded top, beaded bag...) và khu vực "You might be interested in" bên dưới có khoảng cách chuẩn.'
  },
  'search_ranking': {
    id: 'search_ranking',
    title: 'Keyword Relevance Ranking',
    author: 'Le Ngoc Thuy Dung (20225030)',
    heuristic: 'Nielsen #2 (Match between System and Real World)',
    problem: 'Bản gốc: Gõ "bead" nhưng sản phẩm đầu tiên hiện ra lại là "EMBROIDERED TOP..." không chứa từ khóa tìm kiếm.',
    solution: 'Bản cải tiến: Ưu tiên xếp hạng theo Product Name Match trước (Beaded Shoulder Bag, Beaded Ribbed Top, Beaded Bandeau Dress...).'
  },
  'smart_filter': {
    id: 'smart_filter',
    title: 'Collapsible Filter with Summary Chips & Result Count',
    author: 'Le Ngoc Thuy Dung (20225030)',
    heuristic: 'Nielsen #3 (User Control and Freedom) & #1 (Feedback)',
    problem: 'Bản gốc: Bộ lọc dài vô tận, các mục mở toang phải cuộn mỏi tay, không biết đã chọn filter nào, nút "View Results" không báo có bao nhiêu kết quả.',
    solution: 'Bản cải tiến: Đưa các filter đang chọn lên đầu dạng chip có thể xóa (✕); Các mục thu gọn dạng accordion; Nút bấm hiển thị rõ "VIEW 125 RESULTS".'
  },
  // Product Page (PDP)
  'pdp_photo_ratio': {
    id: 'pdp_photo_ratio',
    title: 'Optimized 32% Photo with Interactive Zoom Controls',
    author: 'Pham Chi Thuan (20225018)',
    heuristic: 'Nielsen #8 (Aesthetic and Minimalist Design) & #6 (Recognition)',
    problem: 'Bản gốc: Ảnh sản phẩm chiếm tới 60% chiều cao màn hình, đẩy tên, giá, màu sắc và nút mua hàng xuống khuất màn hình.',
    solution: 'Bản cải tiến: Thu gọn ảnh còn 32% chiều cao màn hình, thêm nút zoom +/- và cử chỉ pinch, đưa toàn bộ Tên, Giá, Màu, Size và Nút Mua lên gọn trong 1 màn hình.'
  },
  'pdp_size_inline': {
    id: 'pdp_size_inline',
    title: 'Direct On-Page Size Selection & Model Fit Info',
    author: 'Pham Chi Thuan (20225018)',
    heuristic: 'Nielsen #7 (Flexibility and Efficiency of Use)',
    problem: 'Bản gốc: Bấm "ADD" (viền mỏng 60px) mới hiện lên một pop-up sheet che mất màn hình để chọn size S/M/L/XL.',
    solution: 'Bản cải tiến: Đặt 4 nút chọn size trực tiếp trên trang ngay phía trên nút "ADD TO BAG", kèm link "Size recommender" và thông số người mẫu (188 cm, Size L).'
  },
  'pdp_add_cta': {
    id: 'pdp_add_cta',
    title: 'High-Affordance 88px Solid ADD TO BAG CTA',
    author: 'Pham Chi Thuan (20225018)',
    heuristic: 'WCAG 2.2 AA & Nielsen #1 (Visibility of System Status)',
    problem: 'Bản gốc: Nút "ADD" chỉ là khung viền đen mỏng, chữ mảnh khó nhận diện là nút hành động chính (weak visual affordance).',
    solution: 'Bản cải tiến: Nút "ADD TO BAG" màu đen đặc, full-width, chiều cao chuẩn công thái học 88px, chữ trắng đậm nổi bật.'
  },
  // Bag & Checkout
  'bag_edit_size': {
    id: 'bag_edit_size',
    title: '1-Tap Inline Size Selector with Inventory Warning',
    author: 'Le Khanh Linh (20225020)',
    heuristic: 'Nielsen #5 (Error Prevention) & #7 (Efficiency)',
    problem: 'Bản gốc: Muốn đổi size áo trong giỏ hàng, người dùng phải trải qua 5 bước cực nhọc: Xóa khỏi giỏ -> Tìm lại áo -> Mở PDP -> Chọn size mới -> Thêm lại.',
    solution: 'Bản cải tiến: Đổi size ngay tại giỏ hàng chỉ trong 1 chạm qua nút `SIZE: M ▼`, hiển thị bottom-sheet với cảnh báo rõ "SOLD OUT" và "ONLY 2 LEFT".'
  },
  'checkout_stepper': {
    id: 'checkout_stepper',
    title: '4-Step Progress Stepper & Safe Exit',
    author: 'Le Khanh Linh (20225020)',
    heuristic: 'Nielsen #1 (Visibility of System Status) & #3 (User Freedom)',
    problem: 'Bản gốc: Màn hình thanh toán không có nút quay lại giỏ hàng rõ ràng (dễ mất đơn), không có tiến trình các bước, phông chữ Serif lộn xộn.',
    solution: 'Bản cải tiến: Thêm thanh tiến trình 4 bước (✓ BAG — ✓ DELIVERY — PAYMENT — DONE), nút "← Back to bag" và "Cancel and return to bag" an toàn.'
  },
  'payment_honesty': {
    id: 'payment_honesty',
    title: 'Honest System Status on Payment Failure',
    author: 'Le Khanh Linh (20225020)',
    heuristic: 'Nielsen #1 (Visibility of System Status) & #9 (Help Users Recover from Errors)',
    problem: 'Bản gốc: Khi giao dịch bị hủy ở phía ngân hàng, app Zara vẫn hiển thị "THANK YOU FOR SHOPPING AT ZARA" gây hiểu lầm nghiêm trọng.',
    solution: 'Bản cải tiến: Hiển thị đúng trạng thái "PAYMENT CANCELLED", giải thích rõ "Bạn chưa bị trừ tiền và giỏ hàng vẫn được lưu trữ", cung cấp nút Thử lại hoặc Đổi phương thức.'
  },
  // Account & Returns
  'cookie_consent': {
    id: 'cookie_consent',
    title: 'Fair Cookie Consent & Granular GDPR Controls',
    author: 'Dang Trung Hieu (20225003)',
    heuristic: 'Nielsen #3 (User Control and Freedom) & GDPR Compliance',
    problem: 'Bản gốc: Dark pattern cưỡng ép - chỉ có 1 nút "CONTINUE" duy nhất, người dùng không có lựa chọn từ chối cookie theo dõi.',
    solution: 'Bản cải tiến: Nút "REJECT NON-ESSENTIAL" (48px) đặt bình đẳng cạnh nút "ACCEPT ALL", kèm trung tâm cài đặt chi tiết 3 cấp độ (Strictly Necessary, Functional, Analytics).'
  },
  'auth_tabs': {
    id: 'auth_tabs',
    title: 'Tabbed Onboarding with Live RFC 5322 Email Validation',
    author: 'Dang Trung Hieu (20225003)',
    heuristic: 'Nielsen #5 (Error Prevention) & #1 (Feedback)',
    problem: 'Bản gốc: Một ô nhập duy nhất "LOG IN OR REGISTER", người dùng không biết mình đang đăng nhập hay tạo mới, không có gợi ý cú pháp.',
    solution: 'Bản cải tiến: Phân định rạch ròi 2 tab [LOG IN] và [REGISTER]; Hiển thị tick xanh tức thì khi email đúng chuẩn RFC 5322; Thanh đo độ mạnh mật khẩu 3 cấp độ.'
  },
  'returns_stepper': {
    id: 'returns_stepper',
    title: '4-Step Returns Wizard & 30-Day Countdown Badge',
    author: 'Dang Trung Hieu (20225003)',
    heuristic: 'Nielsen #9 (Help Users Recover) & #1 (Visibility of Status)',
    problem: 'Bản gốc: Màn hình "THERE ARE NO ACTIVE RETURNS AT THIS TIME" là một ngõ cụt tĩnh (dead-end), không hướng dẫn hạn trả hay điểm gửi đồ.',
    solution: 'Bản cải tiến: Wizard 4 bước trực quan (1. Items -> 2. Reason -> 3. Drop-off Store/Courier -> 4. QR Code) kèm huy hiệu đếm ngược 24 ngày còn lại và bản đồ điểm gửi.'
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
        price: '2,599,000 VND',
        priceGbp: '79.99 GBP',
        priceNum: 2599000,
        image: './products/real_leather_jacket.jpg',
        stock: 'available',
      }
    ]
  });

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
        selectedImage: selectedProduct.image, // SAME model image!
      }));
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
      selectedImage: prod.image,
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
      const newItem = {
        id: `${chosenProduct.id}_${Date.now()}`,
        productId: chosenProduct.id,
        name: chosenProduct.name,
        color: chosenColor,
        size: chosenSize,
        price: chosenProduct.priceVnd,
        priceGbp: chosenProduct.priceForeign,
        priceNum: chosenProduct.priceNum || 2599000,
        image: chosenImage,
        stock: 'available',
      };
      return {
        ...prev,
        selectedSize: chosenSize,
        quantity: 1,
        items: [newItem, ...prev.items.filter(i => i.productId !== chosenProduct.id)]
      };
    });
    navigateTo('bag', side);
  };

  const handleLeftAction = (actionType, payload) => {
    if (actionType === 'navigate') {
      navigateTo(payload, 'left');
    } else if (actionType === 'viewProduct') {
      viewProduct(payload, 'left');
    } else if (actionType === 'addToBag') {
      addToBag(payload?.product || payload, payload?.size, payload?.color, 'left');
    } else if (actionType === 'selectColor') {
      selectPdpColor(payload);
    } else if (actionType === 'selectDepartment') {
      selectDepartment(payload, 'left');
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
