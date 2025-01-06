import { arrayIncludes, logFilterDebug, normalizeString } from './utils';

export class CardFilters {
  private cards: NodeListOf<Element>;
  private selectedCategory: string = '';
  private selectedBrand: string = '';
  private selectedBank: string = '';
  private resultsContainer: HTMLElement | null;
  private noResultsElement: HTMLElement | null;
  
  constructor() {
    this.cards = document.querySelectorAll('[data-card-item]');
    this.resultsContainer = document.querySelector('#results-container');
    this.noResultsElement = document.querySelector('#no-results');
    this.init();
    this.restoreFilters();
  }

  private init(): void {
    document.addEventListener('filter-change', ((event: CustomEvent) => {
      if (event.detail?.type === 'categoria') {
        this.selectedCategory = event.detail.value;
        sessionStorage.setItem('filter-categoria', event.detail.value);
      } else if (event.detail?.type === 'marca') {
        this.selectedBrand = event.detail.value;
        sessionStorage.setItem('filter-marca', event.detail.value);
      } else if (event.detail?.type === 'banco') {
        this.selectedBank = event.detail.value;
        sessionStorage.setItem('filter-banco', event.detail.value);
      }
      this.filterCards();
    }) as EventListener);

    document.addEventListener('clear-filters', () => {
      this.selectedCategory = '';
      this.selectedBrand = '';
      this.selectedBank = '';
      
      sessionStorage.removeItem('filter-categoria');
      sessionStorage.removeItem('filter-marca');
      sessionStorage.removeItem('filter-banco');
      
      ['categoria', 'marca', 'banco'].forEach(type => {
        document.dispatchEvent(new CustomEvent('filter-reset', { detail: { type } }));
      });
      
      this.filterCards();
    });
  }

  private restoreFilters(): void {
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
    let visibleCount = 0;

    this.cards.forEach(card => {
      if (!(card instanceof HTMLElement)) return;

      const cardData = this.getCardData(card);
      const isVisible = this.isCardVisible(filters, cardData);

      if (isVisible) {
        visibleCount++;
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });

    // Update visibility of results/no-results containers
    if (this.resultsContainer && this.noResultsElement) {
      const gridContainer = this.resultsContainer.querySelector('.grid');
      if (gridContainer) {
        gridContainer.classList.toggle('hidden', visibleCount === 0);
      }
      this.noResultsElement.classList.toggle('hidden', visibleCount > 0);
    }

    // Update counter
    document.dispatchEvent(new CustomEvent('update-counter', { 
      detail: { count: visibleCount } 
    }));
  }
}