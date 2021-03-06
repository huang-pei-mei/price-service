// =========== METHODS ==============
const init = async (sequelize, Price) => {
  // seed table with psuedo-random data
  await sequelize.sync();

  for (let i = 0; i < 100; i++) {
    const price = populatePrice();
    const title = populateTitle();
    await Price.create({
      book_id: i,
      book_title: title,
      price: price
    })
    .catch(err => {
      return;
    });
  }
};

const populatePrice = () => {
  // create book prices ranging from $17 to $40
  const decimal = [0.0, 0.98, 0.99];
  const num = Array.from({length: 23}, (v, i) => i + 17);

  return num[Math.floor(Math.random() * 23)] + decimal[Math.floor(Math.random() * 2)];
};

const populateTitle = () => {
  // create book titles
  const titleWords = ['Memory', 'Walk', 'Journey', 'Life', 'Own', 'How', 'Become', 'Lead', 'Hack', 'Learn', 'Conquer', 'Win', 'Lose', 'Tools', 'Remember', 'Begin', 'New', 'When'];
  const joinWords = ['The', 'A', 'If', 'Of', 'To', 'My', 'And'];
  const lengths = Array.from({length: 5}, (v, i) => i + 3);

  let length = lengths[Math.floor(Math.random() * 5)];
  let titleArr = [];
  for (let j = 0; j < length; j++) {
    if (j % 2 === 1 || j === length - 1) {
      titleArr.push(titleWords[Math.floor(Math.random() * titleWords.length)]);
    } else {
      titleArr.push(joinWords[Math.floor(Math.random() * joinWords.length)]);
    }
  }
  return titleArr.join(' ');
};

const findBookId = async (Price, bookId) => {
  const record = await Price.findByPk(bookId);
  if (record === null) {
    console.log(`== find book id for ${bookId} not found!`);
    return null;
  } else {
    return record;
  }
};

const findBookTitle = async (Price, bookTitle) => {
  const record = await Price.findOne({
    where: {
      book_title: bookTitle
    }
  });
  if (record === null) {
    console.log(`== find book title for ${bookTitle} not found!`);
    return null;
  } else {
    return record;
  }
};

module.exports = {
  findBookTitle,
  findBookId,
  init
};