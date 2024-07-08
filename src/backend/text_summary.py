import spacy
from spacy.lang.en.stop_words import STOP_WORDS
from string import punctuation
from heapq import nlargest

text="When updating to a newer version of spaCy, it’s generally recommended to start with a clean virtual environment. If you’re upgrading to a new major version, make sure you have the latest compatible trained pipelines installed, and that there are no old and incompatible packages left over in your environment, as this can often lead to unexpected results and errors. If you’ve trained your own models, keep in mind that your train and runtime inputs must match. This means you’ll have to retrain your pipelines with the new version."

def summarizer(rawdocs):
    stopwords=list(STOP_WORDS)

    nlp= spacy.load("en_core_web_sm")
    doc=nlp(rawdocs)

    tokens=[token.text for token in doc]

    word_freq={}
    for word in doc:
        if word.text.lower() not in stopwords and word.text.lower() not in punctuation:
            if word.text not in word_freq.keys():
                word_freq[word.text]=1
            else:
                word_freq[word.text] +=1

    max_freq=max(word_freq.values())

    for word in word_freq.keys():
        word_freq[word] = word_freq[word]/max_freq

    sent_tokens = [sent for sent in doc.sents]

    sent_scores={}
    for sent in sent_tokens:
        for word in sent:
            if word.text in word_freq.keys():
                if sent not in sent_scores.keys():
                    sent_scores[sent] = word_freq[word.text]
                else:
                    sent_scores[sent] += word_freq[word.text]

    select_len = int(len(sent_tokens) *0.5)

    summary = nlargest(select_len,sent_scores, key= sent_scores.get)

    final_summary= [word.text for word in summary]
    summary =" ".join(final_summary)

    print(text)
    print(summary)
    print("length of original text",len(text.split(" ")))
    print("length of summary",len(summary.split(" ")))

    return summary, doc, len(rawdocs.split(" ")),len(summary.split(" "))

