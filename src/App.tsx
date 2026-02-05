/**
 * Главный компонент приложения
 * 
 * @description Конфигурация маршрутизации и провайдеров
 * 
 * Сайт компании «Стеклопром» — производство стеклопакетов в Ростове-на-Дону
 */

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Preloader from "@/components/ui/Preloader";

// Страницы
import { 
  HomePage, 
  CatalogPage, 
  ServicesPage, 
  AboutPage, 
  CasesPage, 
  ContactsPage,
  BlogPage,
  BlogArticlePage,
  PrivacyPage,
  NotFoundPage 
} from "./pages";

// Создаём клиент для React Query
const queryClient = new QueryClient();

/**
 * Главный компонент App
 */
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Preloader minDuration={1500} />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Главная страница */}
          <Route path="/" element={<HomePage />} />
          
          {/* Каталог продукции */}
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:productType" element={<CatalogPage />} />
          
          {/* Услуги */}
          <Route path="/services" element={<ServicesPage />} />
          
          {/* О компании */}
          <Route path="/about" element={<AboutPage />} />
          
          {/* Наши работы */}
          <Route path="/cases" element={<CasesPage />} />
          
          {/* Контакты */}
          <Route path="/contacts" element={<ContactsPage />} />
          
          {/* Блог */}
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:articleId" element={<BlogArticlePage />} />
          
          {/* Политика конфиденциальности */}
          <Route path="/privacy" element={<PrivacyPage />} />
          
          {/* 404 — страница не найдена */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
