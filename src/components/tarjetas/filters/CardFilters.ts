import { arrayIncludes, logFilterDebug, normalizeString } from './utils';

export class CardFilters {
  private cards: NodeListOf<Element>;
  private selectedCategory: string = '';
  private selectedBrand: string = '';
  private selectedBank: string = '';
  
  constructor() {
    this.cards = document.querySelectorAll('[data-card-item]');
    this.init();
    this.restoreFilters();
  }

  private init(): void {
    // Escuchar eventos de filtro
    document.addEventListener('filter-change', ((event: CustomEvent) => {
      if (event.detail.type === 'categoria') {
        this.selectedCategory = event.detail.value;
        sessionStorage.setItem('filter-categoria', event.detail.value);
      } else if (event.detail.type === 'marca') {
        this.selectedBrand = event.detail.value;
        sessionStorage.setItem('filter-marca', event.detail.value);
      } else if (event.detail.type === 'banco') {
        this.selectedBank = event.detail.value;
        sessionStorage.setItem('filter-banco', event.detail.value);
      }
      this.filterCards();
    }) as EventListener);

    // Escuchar evento de limpiar filtros
    document.addEventListener('clear-filters', () => {
      this.selectedCategory = '';
      this.selectedBrand = '';
      this.selectedBank = '';
      
      // Limpiar sessionStorage
      sessionStorage.removeItem('filter-categoria');
      sessionStorage.removeItem('filter-marca');
      sessionStorage.removeItem('filter-banco');
      
      // Disparar eventos para actualizar UI
      ['categoria', 'marca', 'banco'].forEach(type => {
        const event = new CustomEvent('filter-reset', { detail: { type } });
        document.dispatchEvent(event);
      });
      
      this.filterCards();
    });
  }

  private restoreFilters(): void {
    // Restaurar filtros desde sessionStorage
    const categoria = sessionStorage.getItem('filter-categoria');
    const marca = sessionStorage.getItem('filter-marca');
    const banco = sessionStorage.getItem('filter-banco');

    if (categoria) {
      this.selectedCategory = categoria;
      document.dispatchEvent(new CustomEvent('filter-change', {
        detail: { type: 'categoria', value: categoria }
      }));
    }

    if (marca) {
      this.selectedBrand = marca;
      document.dispatchEvent(new CustomEvent('filter-change', {
        detail: { type: 'marca', value: marca }
      }));
    }

    if (banco) {
      this.selectedBank = banco;
      document.dispatchEvent(new CustomEvent('filter-change', {
        detail: { type: 'banco', value: banco }
      }));
    }

    // Si hay algún filtro activo, aplicar filtros
    if (categoria || marca || banco) {
      this.filterCards();
    }
  }

  private getFilters(): Record<string, string> {
    return {
      categoria: this.selectedCategory,
      banco: this.selectedBank,
      marca: this.selectedBrand
    };
  }

  private getCardData(card: HTMLElement): Record<string, string | string[]> {
    return {
      categorias: card.dataset.categorias?.split(',') || [],
      banco: card.dataset.banco || '',
      marcas: card.dataset.marcas?.split(',') || []
    };
  }

  private isCardVisible(filters: Record<string, string>, cardData: Record<string, string | string[]>): boolean {
    logFilterDebug(filters, cardData);

    return (
      (!filters.categoria || arrayIncludes(cardData.categorias as string[], filters.categoria)) &&
      (!filters.banco || normalizeString(cardData.banco as string) === normalizeString(filters.banco)) &&
      (!filters.marca || arrayIncludes(cardData.marcas as string[], filters.marca))
    );
  }

  private filterCards(): void {
    const filters = this.getFilters();

    this.cards.forEach(card => {
      if (!(card instanceof HTMLElement)) return;

      const cardData = this.getCardData(card);
      const isVisible = this.isCardVisible(filters, cardData);

      card.style.display = isVisible ? 'block' : 'none';
    });

    // Disparar evento para actualizar contador
    document.dispatchEvent(new CustomEvent('filter-change'));
  }
}