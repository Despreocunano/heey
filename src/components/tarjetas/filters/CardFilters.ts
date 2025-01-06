import { arrayIncludes, logFilterDebug, normalizeString } from './utils';

export class CardFilters {
  private cards: NodeListOf<Element>;
  private selects: NodeListOf<HTMLSelectElement>;
  
  constructor() {
    this.cards = document.querySelectorAll('[data-card-item]');
    this.selects = document.querySelectorAll('.filter-select');
    this.init();
  }

  private init(): void {
    this.selects.forEach(select => {
      select.addEventListener('change', () => this.filterCards());
    });
  }

  private getFilters(): Record<string, string> {
    return {
      categoria: (document.getElementById('categoria') as HTMLSelectElement)?.value || '',
      banco: (document.getElementById('banco') as HTMLSelectElement)?.value || '',
      marca: (document.getElementById('marca') as HTMLSelectElement)?.value || ''
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
    // Log filter debug information
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