"use strict";

let should = require("./helpers/setup").should;
import Dictionary from "../src/www/js/app/models/Dictionary";
import Definition from "../src/www/js/app/models/Definition";

describe("Dictionary Tests", () => {

    let dictionary = new Dictionary();

    describe ("#Create", () => {
        it("should be able to create a new instance", () => {
            return dictionary.should.exist;
        });
    });
    
    describe ("#Loaded", () => {
        it("should be able to set itself as loaded", () => {
            dictionary.loaded();
            return dictionary.isLoaded.should.be.true;
        })
    })
    
    describe ("#Empty", () => {
        it("should return an empty sorted index", () => {
            return dictionary.sortedIndex.should.have.lengthOf(0);
        });
        describe ("#find", () => {
            it("searching on an empty dictionary by lemma should not error", () => {
                return dictionary.getEntries({lemma:"cat"}).should.eventually.have.lengthOf(0);
            });
            it("searching on an empty dictionary by wordnetref should not error", () => {
                return dictionary.getEntries({wordNetRef:0}).should.eventually.have.lengthOf(0);
            });
        });
    });

    describe ("#AddApple", () => {
        it("should be able to add an entry.", () => {
            let definition = new Definition({
                wordNetRef: 1,
                lemmas: ["apple"],
                partOfSpeech: "noun",
                gloss: "A tasty fruit"
            });
            return dictionary._addDefinition(definition).should.exist;
        });
        it("should now return a single sorted index", () => {
            return dictionary.sortedIndex.should.have.lengthOf(1);
        });
        it("... that contains the word Apple", () => {
            return dictionary.sortedIndex.should.deep.equal(["apple"]);
        });
        describe ("#find", () => {
            it("should be able to find the entry for Apple via lemma", () => {
                return dictionary.getEntries({lemma:"apple"}).should.eventually.have.lengthOf(1).and.deep.property("[0].gloss","A tasty fruit");
            });
            it("should be able to find the entry for Apple via wordnetref", () => {
                return dictionary.getEntries({wordNetRef:1}).should.eventually.have.lengthOf(1).and.deep.property("[0].gloss","A tasty fruit");
            });
        });
    });

    describe ("#AddCat", () => {
        it("should be able to add a second entry.", () => {
            let definition = new Definition({
                wordNetRef: 2,
                lemmas: ["cat"],
                partOfSpeech: "noun",
                gloss: "A funny animal that purrs"
            });
            return dictionary._addDefinition(definition).should.exist;
        });
        it("should now return a sorted index of length 2", () => {
            return dictionary.sortedIndex.should.have.lengthOf(2);
        });
        it("... that is [apple, cat] ", () => {
            return dictionary.sortedIndex.should.deep.equal(["apple", "cat"]);
        });
        describe ("#find", () => {
            it("should be able to find the entry for Cat via lemma", () => {
                return dictionary.getEntries({lemma:"cat"}).should.eventually.have.lengthOf(1).and.deep.property("[0].gloss","A funny animal that purrs");
            });
            it("should be able to find the entry for Cat via wordnetref", () => {
                return dictionary.getEntries({wordNetRef:2}).should.eventually.have.lengthOf(1).and.deep.property("[0].gloss","A funny animal that purrs");
            });
        });
    });

    describe ("#AddCat(person)", () => {
        it("should be able to add a third entry to an existing lemma.", () => {
            let definition = new Definition({
                wordNetRef: 3,
                lemmas: ["cat"],
                partOfSpeech: "noun",
                gloss: "A person"
            });
            return dictionary._addDefinition(definition).should.exist;
        });
        it("should still return a sorted index of length 2", () => {
            return dictionary.sortedIndex.should.have.lengthOf(2);
        });
        it("... that is [apple, cat] ", () => {
            return dictionary.sortedIndex.should.deep.equal(["apple", "cat"]);
        });
        describe ("#find", () => {
            it("should be able to find the entry for Cat(person)via lemma", () => {
                return dictionary.getEntries({lemma:"cat"}).should.eventually.have.lengthOf(2).and.deep.property("[1].gloss","A person");
            });
            it("should be able to find the entry for Cat(person) via wordnetref", () => {
                return dictionary.getEntries({wordNetRef:3}).should.eventually.have.lengthOf(1).and.deep.property("[0].gloss","A person");
            });
        });
    });

    describe ("#AddRock/Stone", () => {
        it("should be able to add a fourth entry with two lemmas.", () => {
            let definition = new Definition({
                wordNetRef: 4,
                lemmas: ["stone", "rock"],
                partOfSpeech: "noun",
                gloss: "A hard piece of earth; not dirt"
            });
            return dictionary._addDefinition(definition).should.exist;
        });
        it("should return a sorted index of length 4", () => {
            return dictionary.sortedIndex.should.have.lengthOf(4);
        });
        it("... that is [apple, cat, rock, stone] ", () => {
            return dictionary.sortedIndex.should.deep.equal(["apple", "cat", "rock", "stone"]);
        });
        describe ("#find", () => {
            it("should be able to find the entry for rock via lemma", () => {
                return dictionary.getEntries({lemma:"rock"}).should.eventually.have.lengthOf(1).and.deep.property("[0].gloss","A hard piece of earth; not dirt");
            });
            it("should be able to find the entry for rock via stone", () => {
                return dictionary.getEntries({lemma:"stone"}).should.eventually.have.lengthOf(1).and.deep.property("[0].gloss","A hard piece of earth; not dirt");
            });
            it("should be able to find the entry for rock/stone via wordnetref", () => {
                return dictionary.getEntries({wordNetRef:4}).should.eventually.have.lengthOf(1).and.deep.property("[0].gloss","A hard piece of earth; not dirt");
            });
        });
    });

    describe ("#BadSearch", () => {
        it("should be return empty array for invalid wordnetref", () => {
            return dictionary.getEntries({wordNetRef:5}).should.eventually.have.lengthOf(0);
        });
        it("should be return empty array for invalid lemma", () => {
            return dictionary.getEntries({lemma:"dog"}).should.eventually.have.lengthOf(0);
        });
    });
});
