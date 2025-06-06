// This file demonstrates a sample function using mtgsdk to fetch cards.
import * as mtg from 'mtgsdk';

/**
 * Fetches a sample of Magic: The Gathering cards using mtgsdk.
 * Returns a Promise resolving to an array of card objects.
 */
export async function fetchSampleCards() {
  // Fetch 5 cards with the name 'Black Lotus' as a sample
  return new Promise((resolve, reject) => {
    mtg.card.where({ name: 'Black Lotus' })
      .then(cards => resolve(cards))
      .catch(err => reject(err));
  });
}
