import telebot
import requests
import logging

logging.basicConfig(level=logging.INFO)

class NewsBot:
    def __init__(self, token):
        self.bot = telebot.TeleBot(token, threaded=False)
        self.bot.set_update_listener(self._handle_messages)
        self.current_message = None
        self.api_key = self._read_api_key('apikey')
        self.sent_articles = set()  # To keep track of sent article URLs

    def _handle_messages(self, messages):
        for message in messages:
            self.current_message = message
            self._process_message(message)

    def _read_api_key(self, file_path):
        """Reads the API key from a file"""
        try:
            with open(file_path, 'r') as f:
                key = f.read().strip()
            if not key:
                raise ValueError("API key file is empty")
            return key
        except FileNotFoundError:
            raise FileNotFoundError(f"API key file '{file_path}' not found")
        except Exception as e:
            raise Exception(f"Error reading API key: {e}")

    def _process_message(self, message):
        text = message.text
        options = "Press 1 for General news\nPress 2 for Business news\nPress 3 for Sports news\nPress 4 for Technology news"
        
        if text == '/start':
            self._send_message(options)
        elif text == '1':
            self._fetch_and_send_news('general')  # General news
        elif text == '2':
            self._fetch_and_send_news('business')  # Business news
        elif text == '3':
            self._fetch_and_send_news('sports')  # Sports news
        elif text == '4':
            self._fetch_and_send_news('technology')  # Technology news
        else:
            self._send_message("Invalid input. Please try again.")
            self._send_message(options)

    def _fetch_and_send_news(self, category):
        """Fetch and send global news from the selected category."""
        global_url = f'https://newsapi.org/v2/top-headlines?category={category}&apiKey={self.api_key}'

        try:
            # Fetch global news
            response = requests.get(global_url)

            if response.status_code == 200:
                data = response.json()
                articles = data.get('articles', [])

                self._send_articles(articles, category)
            else:
                self._send_message(f"Request failed with status code: {response.status_code}\n{response.text}")
        except requests.exceptions.RequestException as e:
            self._send_message(f"Request failed: {e}")
        except Exception as e:
            self._send_message(f"An unexpected error occurred: {e}")
        finally:
            self._send_message("Press 1 for General news\nPress 2 for Business news\nPress 3 for Sports news\nPress 4 for Technology news")

    def _send_articles(self, articles, category):
        """Send up to 5 new articles to the user."""
        new_articles = [article for article in articles if article['url'] not in self.sent_articles]
        
        if new_articles:
            for article in new_articles[:5]:  # Limit to 5 new articles
                self._send_message(f"{article['title']}\n{article['description']}\n{article['url']}")
                self.sent_articles.add(article['url'])
        else:
            self._send_message(f'No new {category.capitalize()} news articles found.')

    def _send_message(self, text, reply_to_message_id=None):
        self.bot.send_message(self.current_message.chat.id, text, reply_to_message_id=reply_to_message_id)

    def start(self):
        """Start polling messages from users"""
        self.bot.infinity_polling()

if __name__ == '__main__':
    try:
        with open('telegramToken', 'r') as f:
            token = f.read().strip()
        if not token:
            raise ValueError("Telegram token file is empty")
        bot = NewsBot(token)
        bot.start()
    except FileNotFoundError:
        print("Error: .telegramToken file not found.")
    except Exception as e:
        print(f"Error: {e}")
