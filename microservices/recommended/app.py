import json
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from nltk.corpus import wordnet
from nltk.metrics import edit_distance

# nltk.download('punkt')
# nltk.download('stopwords')
# nltk.download('wordnet')

articles_full = [{}]
with open('news.json', 'r') as file:
    json_data = json.load(file)
    
    articles_full = json_data['articles']

# print(type(articles_full))
# print(len(articles_full))

# for article in articles_full:
#     print(article['title'])
#     print('\n')

modifiedList = []


# we need to get sentence from mongo db
file_path = "server/email.txt"
def read_file(file_path):
    try:
        with open(file_path, 'r') as file:
            file_content = file.read()
        return file_content
    except FileNotFoundError:
        print(f"File '{file_path}' not found.")
        return None
    except Exception as e:
        print(f"Error reading file '{file_path}': {e}")
        return None


email = read_file(file_path)
print(email)
# sentence = "I am Sahil , i live in New Zealand"




def preprocess_text(text):
    # Tokenization
    tokens = word_tokenize(text.lower())
    # Remove stopwords
    stop_words = set(stopwords.words('english'))
    tokens = [word for word in tokens if word not in stop_words]
    # # Lemmatization
    lemmatizer = WordNetLemmatizer()
    tokens = [lemmatizer.lemmatize(word, wordnet.VERB) for word in tokens]
    # print(tokens)
    return tokens


def sentence_similarity(sentence1, sentence2):
    # Preprocess sentences
    tokens1 = preprocess_text(sentence1)
    tokens2 = preprocess_text(sentence2)
    # Calculate Jaccard similarity
    jaccard_similarity = nltk.jaccard_distance(set(tokens1), set(tokens2))
    # Calculate edit distance similarity
    edit_distance_similarity = 1 - (edit_distance(tokens1, tokens2) / max(len(tokens1), len(tokens2)))
    # Combine both similarities
    combined_similarity = (jaccard_similarity + edit_distance_similarity) / 2
    return combined_similarity


# for article in articles_full:
#     new_article = article.copy()
#     # new_article['lemmitized_title'] = preprocess_text(new_article['title'])
#     new_article['similarity'] = sentence_similarity(new_article['title'], sentence)
#     modifiedList.append(new_article)

# # for new_article in modifiedList:
# #     print(new_article['similarity'] )
# #     print('\n')

# sorted_list = sorted(modifiedList, key=lambda x: x['similarity'], reverse=True)

# for new_article in sorted_list:
#     print(new_article['title'] + " " + str(new_article['similarity']))

# output_dict = {"articles": sorted_list}

# # Save the output dictionary to a file named "output.txt"
# with open('output.txt', 'w') as output_file:
#     json.dump(output_dict, output_file)