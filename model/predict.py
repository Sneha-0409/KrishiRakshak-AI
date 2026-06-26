import os
import json
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing import image

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_PATH = os.path.join(
    BASE_DIR,
    "saved_model",
    "plant_disease_model.keras"
)

CLASS_PATH = os.path.join(
    BASE_DIR,
    "classes.json"
)

print("Loading AI Model...")

model = tf.keras.models.load_model(MODEL_PATH)

print("Model Loaded Successfully!")

with open(CLASS_PATH, "r") as f:
    class_names = json.load(f)

# Prediction Function
def predict_image(image_path):

    img = image.load_img(
        image_path,
        target_size=(224,224)
    )

    img_array = image.img_to_array(img)

    img_array = np.expand_dims(img_array, axis=0)

    img_array = img_array / 255.0

    predictions = model.predict(img_array, verbose=0)

    confidence = float(np.max(predictions))

    predicted_index = np.argmax(predictions)

    disease = class_names[predicted_index]

    probability_dict = {}

    for i, cls in enumerate(class_names):

        probability_dict[cls] = round(
            float(predictions[0][i])*100,
            2
        )

    return {

        "disease": disease,

        "confidence": round(confidence*100,2),

        "probabilities": probability_dict

    }

# Test Prediction

# if __name__ == "__main__":

#     sample_image = input(
#         "Enter image path: "
#     )

#     result = predict_image(sample_image)

#     print("\nPrediction Result\n")

#     print(result)
