export class Item {
  public name: string;
  public sellIn: number;
  public quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

enum ItemTypes {
  AGED_BRIED = 'Aged Brie',
  BACKSTAGE_PASSES = 'Backstage passes to a TAFKAL80ETC concert',
  SULFURAS = 'Sulfuras, Hand of Ragnaros',
  CONJURED = 'Conjured'
}

const MAX_QUALITY = 50;
const MIN_QUALITY = 0;

export class GildedRose {
  protected items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (const item of this.items) {
      switch (item.name) {
        case ItemTypes.AGED_BRIED:
          this.updateAgedBrieItem(item);
          break;
        case ItemTypes.BACKSTAGE_PASSES:
          this.updateBackstagePassesItem(item);
          break;
        case ItemTypes.SULFURAS:
          this.updateSulfurasItem(item);
          break;
        case ItemTypes.CONJURED:
          this.updateConjuredItem(item);
          break;
        default:
          this.updateNormalItem(item);
          break;
      }
    }

    return this.items;
  }

  // Update items
  // ============
  private updateNormalItem(item: Item) {
    this.decrementProperty(item, 'quality');

    if (item.sellIn < 0) {
      this.decrementProperty(item, 'quality');
    }
    
    this.decreaseSellIn(item);
  }

  private updateAgedBrieItem(item: Item) {
    this.incrementProperty(item, 'quality');
    
    if (item.sellIn < 0) {
      this.incrementProperty(item, 'quality');
    }
    
    this.decreaseSellIn(item);
  }

  private updateBackstagePassesItem(item: Item) {
    if (item.sellIn < 0) {
      item.quality = 0;
    } else {
      this.incrementProperty(item, 'quality');
      if (item.sellIn <= 10) {
        this.incrementProperty(item, 'quality');
      }

      if (item.sellIn <= 5) {
        this.incrementProperty(item, 'quality');
      }
    }

    this.decreaseSellIn(item);
  }

  private updateSulfurasItem(item: Item) {
    item.quality = 80;

    return item;
  }

  private updateConjuredItem(item: Item) {
    if (item.quality > (MIN_QUALITY + 2)) {
      this.decrementProperty(item, 'quality', 2);
    }

    if (item.sellIn < 0 && item.quality > 2) {
      this.decrementProperty(item, 'quality', 2);
    }

    this.decreaseSellIn(item);
  }

  // Helpers
  // ============
  private decrementProperty(item: Item, property: string, quantity: number = 1) {
    if (item[property] > MIN_QUALITY) {
      item[property] -= quantity;
    }
  }

  private incrementProperty(item: Item, property: string, quantity: number = 1) {
    if (item[property] < MAX_QUALITY) {
      item[property] += quantity;
    }
  }

  private decreaseSellIn(item: Item) {
    item.sellIn = item.sellIn - 1;
  }
}
