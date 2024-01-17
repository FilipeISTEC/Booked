// BookPage.js
import React from 'react';

export const BookPage = ({ selectedItem }) => {
  return (
    <div>
      <h1>Detalhes do Livro: {selectedItem}</h1>
      {/* Adicione outros detalhes do livro conforme necessário */}
    </div>
  );
};
