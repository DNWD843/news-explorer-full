export const BASE_URL = 'https://api.truthseeker.students.nomoreparties.xyz';
//export const BASE_URL = 'http://localhost:4000'; // for dev mode

export const TOKEN_KEY = 'token';

export const USER_KEY = 'user';

export const FOUND_NEWS_KEY = 'foundNews';

export const SAVED_NEWS_KEY = 'savedNews';

//export const NEWS_API_URL = 'https://newsapi.org/v2'; // for dev mode
export const NEWS_API_URL = 'https://nomoreparties.co/news/v2'; // for production

export const PAGE_SIZE = '100';

export const API_KEY = 'aeb6d1408e304fc385558c5bbe2b0e45';

export const DATE_TO = new Date(Date.now()).toISOString();

export const DATE_FROM = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

export const INVALID_REGISTRATION_DATA_MESSAGE = 'Переданы некорректные регистрационные данные';

export const INVALID_AUTHORIZATION_DATA_MESSAGE = 'Переданы некорректные данные';
