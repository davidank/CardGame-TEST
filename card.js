// (*)LETTRS Deck Simulator
// Made by Davidank

///////////////////////////////////////////////////////////////////////////////
// Defining Stack & it's methods                                             //
///////////////////////////////////////////////////////////////////////////////

function Card(upper, mid, lower, rarity, statsCounter) {
	this.upper = upper;
	this.mid = mid;
	this.lower = lower;
  this.rarity = rarity;
	this.statsCounter = statsCounter;
}

function Stack() {
	this.cards = [];
	this.cardsList = [];
	this.makeDeck = stackMakeDeck;
	this.shuffle = stackShuffle;
	this.deal = stackDeal;
	this.addCard = stackAddCard;
	this.draw = stackDraw;
	this.discard = stackDiscard;
	this.show = stackShow;
	this.cardCount = stackCardCount;
	this.combine = stackCombine;
  this.addStats = stackAddStats;
}

function stackMakeDeck() {
	// cardCount is associated with the number of each element in upper & lower
	// Example: ["A","B"] w/ [3, 2] = 3 A's, and 2 B's
	this.cards = [];
	var upper = ["E","R","S","T","D","C","M","W","P","K","G","B","Y","R","B","G"];
	var mid = [" "," "," "," "," "," ","#","#","#","#","#","#","#","#","#","#"];
	var lower = ["A","N","I","H","O","L","Q","U","J","V","X","F","Z","^","^","^"];
  var rarity = ["C","C","C","C","C","C","R","R","R","R","R","R","R","^","^","^"];
	var cardCount = [42, 30, 30, 21, 21, 21, 15, 15, 15, 15, 15, 15, 15, 20, 20, 20];

	if (cardCount.length === upper.length && lower.length === upper.length) {
		// Creates an ordered deck of cards
		for (var i = 0; i < cardCount.length; i++) {
			var counter = cardCount[i];
			while (counter !== 0) {
				this.cards.push(new Card(upper[i], mid[i], lower[i], rarity[i], 0));
				counter = counter - 1;
			}
			// Creates an array of unique letter cards and allows counting the elements
			this.cardsList.push(new Card(upper[i], mid[i], lower[i], rarity[i], 0));
		}
	} else {
		console.log("Deck Contents ERROR");
	}
}

function stackShuffle(n) {
	var i, j, k;
	var temp;

	// Shuffle the stack 'n' times
	for (i = 0; i < n; i++)
		for (j = 0; j < this.cards.length; j++) {
			k = Math.floor(Math.random() * this.cards.length);
			temp = this.cards[j];
			this.cards[j] = this.cards[k];
			this.cards[k] = temp;
		}
}

function stackDeal() {
	// removes a card
	if (this.cards.length > 0)
		return this.cards.shift();
	else
		return null;
}

function stackAddCard(card) {
	this.cards.push(card);
}

function stackDraw(n) {
	// Can only be used to take cards from 'deck'
	for (var i = 0; i < n; i++) {
		this.addCard(deck.deal());
	}
}

function stackDiscard() {
	// Cards are moved to 'discard'
	discard.cards = this.cards;
	this.cards = [];
}

function stackShow() {
	// Displays hand contents in console
	var handSpacer = " | ";
	var upperLine = "| ";
	var midLine = "| ";
	var lowerLine = "| ";

	for (var i = 0; i < this.cards.length; i++) {
		upperLine += this["cards"][i]["upper"] + handSpacer;
		if (this["cards"][i]["lower"] === "^") {
			midLine += "^" + handSpacer;
		} else if (this["cards"][i]["mid"] === " ") {
			midLine += " " + handSpacer;
		} else {
			midLine += this["cards"][i]["mid"] + handSpacer;
		}
		lowerLine += this["cards"][i]["lower"] + handSpacer;
	}

	console.log(upperLine);
	console.log(midLine);
	console.log(lowerLine);
}

function stackCardCount() {
	return this.cards.length;
}

function stackCombine(stack) {
	// stackCombine(stack) >>> stack is getting eaten
	this.cards = this.cards.concat(stack.cards);
	stack.cards = [];
}

function stackAddStats(stats) {
  // Tracks a number of stats regarding the stack that called
  for (var i = 0; i < this.cards.length; i++) {
    if (this["cards"][i]["upper"] === "R" && this["cards"][i]["lower"] === "^") {
      stats.numRedStar +=  1;
    } else if (this["cards"][i]["upper"] === "B" && this["cards"][i]["lower"] === "^") {
      stats.numBlueStar += 1;
    } else if (this["cards"][i]["upper"] === "G" && this["cards"][i]["lower"] === "^") {
      stats.numGoldStar += 1;
    } else {

			for (var j = 0; j < deck.cardsList.length; j++) {
				if (this["cards"][i]["upper"] === deck["cardsList"][j]["upper"]) {
					deck["cardsList"][j]["statsCounter"] += 1;
				}
			}

      stats.numLetterCards += 1;

      if (this["cards"][i]["rarity"] === "C") {
        stats.numCommonCards += 1;
      } else if (this["cards"][i]["rarity"] === "R") {
        stats.numRareCards += 1;
      }

    }
		stats.totalCards += 1;
  }
}

///////////////////////////////////////////////////////////////////////////////
// Statistics Reporting                                                      //
///////////////////////////////////////////////////////////////////////////////
function printStatsReport(stats) {
	// Print the report
	stats.runCalculations(stats);
	console.log("Simulation Statistics Report");
	console.log("-----------------------------------------");
	console.log("");
	console.log("Total RED STAR(s):    " + stats.numRedStar + "("
																			 + stats.percentRedStar + "%)");
	console.log("Total BLUE STAR(s):   " + stats.numBlueStar + "("
																			 + stats.percentBlueStar + "%)");
	console.log("Total GOLD STAR(s):   " + stats.numGoldStar + "("
																			 + stats.percentGoldStar + "%)");
	console.log("  Total Star Card(s):   " + stats.totalStarCards + " / "
																				 + stats.totalCards + " = "
																				 + stats.percentTotalStar + "%");
	console.log("");
	console.log("Total Rare Letter Cards(s):   " + stats.numRareCards + "("
																							 + stats.percentRareCards + "%)");
	console.log("Total Common Letter Cards(s): " + stats.numCommonCards + "("
																							 + stats.percentCommonCards + "%)");
	console.log("  Total Letter Card(s): " + stats.numLetterCards + " / "
																				 + stats.totalCards + " = "
																				 + stats.percentLetterCards + "%");
	console.log("");

	console.log("    Letter Concentrations");
	for (var i = 0; i < deck.cardsList.length - 3; i++) {
		console.log("       " + deck["cardsList"][i]["upper"] + " / "
												+ deck["cardsList"][i]["mid"] + " / "
												+ deck["cardsList"][i]["lower"] + ": "
												+ deck["cardsList"][i]["statsCounter"] + "("
											  + stats["storeLetterPercents"][i] + "%)");
	}

	console.log("");
	console.log("Deck Size: " + deck.cardCount() + "");
	console.log("");
	console.log("-----------------------------------------");
	console.log(" END OF STATISTICS REPORT");
}

function trackStats() {
	// These data are recorded with 'addStats'
	this.numRedStar = 0;
	this.numBlueStar = 0;
	this.numGoldStar = 0;
	this.numLetterCards = 0;
	this.totalCards = 0;
	this.numRareCards = 0;
	this.numCommonCards = 0;
	this.storeLetterPercents = [];
	this.runCalculations = runCalculations;

	// functions to assist stats reporting
	function percentFixed(num) {
		num = num * 100;
		return num.toFixed(1);
	}

	function runCalculations(stats) {
		// Star Card Calculations
		stats.totalStarCards = stats.totalCards - stats.numLetterCards;
		stats.percentRedStar = percentFixed(stats.numRedStar / stats.totalStarCards);
		stats.percentBlueStar = percentFixed(stats.numBlueStar / stats.totalStarCards);
		stats.percentGoldStar = percentFixed(stats.numGoldStar / stats.totalStarCards);
		stats.percentTotalStar = percentFixed(stats.totalStarCards / stats.totalCards);

		// Letter Card Calculations
		stats.percentRareCards = percentFixed(stats.numRareCards / stats.numLetterCards);
		stats.percentCommonCards = percentFixed(stats.numCommonCards / stats.numLetterCards);
		stats.percentLetterCards = percentFixed(stats.numLetterCards / stats.totalCards);

		// Individual Letter Card Concentrations
		for (var i = 0; i < deck.cardsList.length; i++) {
			stats.storeLetterPercents.push(percentFixed((deck["cardsList"][i]["statsCounter"]) / stats.numLetterCards));
		}
	}
}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

/* Stack Methods
	makeDeck
	shuffle
	deal
	addCard
	draw
	discard
	show
	cardCount
	combine
  addStats
*/

// Initializing core objects
var deck = new Stack();
var hand = new Stack();
var discard = new Stack();
var stats1 = new trackStats();

// Start Simulation
console.log("LETTRS Deck Simulator");
console.log("Choose number of simulation(s)...");
process.stdin.setEncoding('utf8');
var mode;
process.stdin.on('readable', function() {
  mode = process.stdin.read();
  if (mode !== null) {
    firstHandTest(mode);
    process.exit();
  }
});

// Test Case
function firstHandTest(x) {
	function drawLine() {
		console.log("-----------------------------------------");
	}
  console.log("");
  drawLine();
	console.log("  First Hand(s) Simulated: " + x);
	console.log("  Star Cards are represented with '^'");
	drawLine();
  console.log("");

	deck.makeDeck();

	for (var i = 0; i < x; i++) {
		deck.shuffle(6);
		hand.draw(10);
    hand.addStats(stats1);
		hand.show();
		hand.discard();
		deck.combine(discard);
		if (i === x - 1) {
			console.log("");
      drawLine();
    } else {
      console.log("");
      drawLine();
      console.log("");
    }
  }
	console.log("  END OF SIMULATION");
  console.log("");
  console.log("");
  console.log("");
  printStatsReport(stats1);
}
