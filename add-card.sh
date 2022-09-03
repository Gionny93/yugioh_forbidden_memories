#!/bin/bash

#"USAGE -> ./add-card -a card1 -b card2 -c card3 -d card4 -e card5 -f fusion"

while getopts a:b:c:d:e:f: flag
do
	case "${flag}" in
		a) card1=${OPTARG};;
		b) card2=${OPTARG};;
		c) card3=${OPTARG};;
		d) card4=${OPTARG};;
		e) card5=${OPTARG};;
		f) fusion=${OPTARG};;
	esac
done

RES=$(echo "${card1:+$card1,}${card2:+$card2,}${card3:+$card3,}${card4:+$card4,}${card5:+$card5,}=$fusion" | sed -e 's/,=/=/g')
echo $RES >> fusions.csv
echo "FUSION ADDEDD SUCCESSFULLY"

echo ${RES} | cut -d= -f 1 | tr , "\n" >> deck.csv
# bo non funziona diretto
sort -u deck.csv > deck2.csv
cat deck2.csv > deck.csv
rm -rf deck2.csv
echo "CARDS ADDEDD SUCCESSFULLY TO DECK"
