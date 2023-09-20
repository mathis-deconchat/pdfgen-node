import createPdf from './create-pdf.js'
import { input } from '@inquirer/prompts';
import select, { Separator } from '@inquirer/select';
import express from 'express';




let cardData = {}
const name = await input({ message: 'Enter your name' });
cardData.name = name

const kind = await select({
    message: 'Select a package manager',
    choices: [
      {
        name: 'Chevalier',
        value: 'chevalier',
        description: 'chevalier is chevalier',
      },
      {
        name: 'Poney',
        value: 'poney',
        description: 'poney is poney',
      },    
    ],
  });
cardData.kind = kind

createPdf(cardData)


