// Initializes the scryfall-sdk and exposes a function to fetch a card by name.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: No type definitions for scryfall-sdk
import * as Scry from 'scryfall-sdk';

Scry.setAgent('kelvin-mtg-ui', '1.0.0');

/**
 * Fetches a Magic: The Gathering card by name using scryfall-sdk.
 * @param name - The name of the card to fetch.
 * @returns A Promise resolving to the card object or null if not found.
 */
export async function getCardByName(name: string) {
  try {
    const card = await Scry.Cards.byName(name);
    if (card) {
      return { name: card.name, text: card.getText() };
    }
    return null;
  } catch (error) {
    console.log(`Error fetching card "${name}":`, error);
    return null;
  }
}
