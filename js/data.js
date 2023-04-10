import { getRandomInt } from './util.js';

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
  'Максим',
  'Людмила',
  'Георгий',
];

const COMMENTS_TEXTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  'Супер! У меня аж подкачались щеки от смеха.',
  'Ой, ну это просто гениально!',
  'Кто-то явно хорошо повеселился, когда делал эту фотографию.',
  'Ахаха, прекрасный момент! Вот это я понимаю, фотограф с чувством юмора.',
  'Не могу поверить, что это реально случилось!',
  'Это просто супер! Спасибо за позитив!',
  'Смех продлевает жизнь, а ваша фотография - лучшее доказательство.',
  'Фотография дня, однозначно!',
  'Никогда не видел ничего подобного! Браво!',
  'Это просто шедевр! Смеюсь уже минут 10.',
  'Фотография вызывает неподдельный смех. Что может быть лучше?',
  'Вот это кадр! Заслуживает стать мемом.',
  'Это должно стать вирусным! Слишком смешно, чтобы держать это в секрете.',
  'Ваше чувство юмора зашкаливает!',
  'Хочу еще фотографий в таком стиле!',
  'Такие смешные моменты стоит запечатлевать и показывать всем!',
  'Просто огонь! Вот это талант!',
  'Очень радует, что есть такие талантливые и креативные люди.',
  'Смотрю на эту фотографию и не могу перестать смеяться. Прекрасно!',
];

export function getRandomCommentText() {
  const randomIndex = getRandomInt(0, COMMENTS_TEXTS.length - 1);
  return COMMENTS_TEXTS[randomIndex];
}

export function createComment(commentId) {
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

export function generatePhotos() {
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