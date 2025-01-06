import { arrayIncludes, logFilterDebug, normalizeString } from './utils';

export class CardFilters {
  private cards: NodeListOf<Element>;
  private selectedCategory: string = '';
  private selectedBrand: string = '';
  private selectedBank: string = '';
  
  constructor() {
    this.cards = document.querySelectorAll('[data-card-item]');
    this.init();
  }

  private init(): void {
    // Escuchar eventos de filtro
    document.addEventListener('filter-change', ((event: CustomEvent) => {
      if (event.detail.type === 'categoria') {
        this.selectedCategory = event.detail.value;
      } else if (event.detail.type === 'marca') {
        this.selectedBrand = event.detail.value;
      } else if (event.detail.type === 'banco') {
        this.selectedBank = event.detail.value;
      }
      this.filterCards();
    }) as EventListener);

    // Escuchar evento de limpiar filtros
    document.addEventListener('clear-filters', () => {
      this.selectedCategory = '';
      this.selectedBrand = '';
      this.selectedBank = '';
      
      // Disparar eventos para actualizar UI
      ['categoria', 'marca', 'banco'].forEach(type => {
        const event = new CustomEvent('filter-reset', { detail: { type } });
        document.dispatchEvent(event);
      });
      
      this.filterCards();
    });
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
  }
}