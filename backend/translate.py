from googletrans import Translator
def translate_content(text_to_translate, lang="en"):
    try:
        #Initialize the translator
        translator = Translator()
        translated_text = translator.translate(text_to_translate, dest=lang)
        translated = translated_text.text
        return translated
    except:
        return "Error Translating"
