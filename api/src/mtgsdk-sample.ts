// This file demonstrates a sample function using scryfall-sdk to fetch cards.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: No type definitions for scryfall-sdk
import * as Scry from 'scryfall-sdk';

/**
 * Fetches a sample of Magic: The Gathering cards using scryfall-sdk.
 * Returns a Promise resolving to an array of card objects.
 */
export async function fetchSampleCards() {
  Scry.setAgent('kelvin-mtg-ui', '1.0.0');

  // Fetch cards with the name 'Black Lotus' as a sample
  const blackLotus = await Scry.Cards.byName('Black Lotus');

  if (blackLotus) {
    return { name: blackLotus.name, text: blackLotus.oracle_text };
  } else {
    return null;
  }
}
