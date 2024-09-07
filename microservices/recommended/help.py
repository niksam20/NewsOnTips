import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from nltk.corpus import wordnet
from nltk.metrics import edit_distance

# nltk.download('punkt')
# nltk.download('stopwords')
# nltk.download('wordnet')

sentence = "I am Sahil , I love to eat Ice Creams @ Rs. 30 - 50 only , ice-creams costing out of this range are out ot my budget !!"
sentence1= "Hello Good morning , i am here to provide you relevant news !!"

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


preprocess_text(sentence)