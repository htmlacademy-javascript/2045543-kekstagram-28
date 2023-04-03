const NAMES = [
  'Александр',
  'Мария',
  'Иван',
  'Елена',
  'Михаил',
  'Ольга',
  'Дмитрий',
  'Анна',
  'Сергей',
  'Татьяна',
  'Андрей',
  'Ирина',
  'Павел',
  'Юлия',
  'Роман',
  'Наталья',
  'Владимир',
  'Екатерина',
  'Алексей',
  'Светлана',
  'Николай',
  'Вероника',
  'Виктор',
  'Людмила',
  'Георгий',
];

const COMMENTS_TEXTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomCommentText() {
  const randomIndex = getRandomInt(0, COMMENTS_TEXTS.length - 1);
  return COMMENTS_TEXTS[randomIndex];
}

function createComment(commentId) {
  const randomNameIndex = getRandomInt(0, NAMES.length - 1);
  const randomAvatarNumber = getRandomInt(1, 6);

  const comment = {
    id: commentId,
    avatar: `img/avatar-${randomAvatarNumber}.svg`,
    message: getRandomCommentText(),
    name: NAMES[randomNameIndex],
  };

  return comment;
}

function generatePhotos() {
  const photos = [];
  let commentId = 1;

  for (let i = 1; i <= 25; i++) {
    const numberOfComments = getRandomInt(1, 5);
    const comments = [];

    for (let j = 0; j < numberOfComments; j++) {
      comments.push(createComment(commentId));
      commentId++;
    }

    const photo = {
      id: i,
      url: `photos/${i}.jpg`,
      description: `Описание фотографии ${i}`,
      likes: getRandomInt(15, 200),
      comments: comments,
    };

    photos.push(photo);
  }

  return photos;
}

const photos = generatePhotos();
console.log(photos);


