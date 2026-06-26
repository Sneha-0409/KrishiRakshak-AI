import streamlit as st
import requests

st.set_page_config(
    page_title="KrishiRakshak AI",
    page_icon="🌾",
    layout="wide"
)

# Custom CSS
st.markdown("""
<style>

.main{
    background-color:#f5fff5;
}

.title{
    font-size:42px;
    font-weight:bold;
    color:#1b5e20;
}

.subtitle{
    font-size:18px;
    color:gray;
}

.result-box{
    background:#ffffff;
    padding:20px;
    border-radius:12px;
    border:1px solid #dddddd;
}

</style>
""", unsafe_allow_html=True)

# Header
st.markdown(
    "<div class='title'>🌾 KrishiRakshak AI</div>",
    unsafe_allow_html=True
)

st.markdown(
    "<div class='subtitle'>AI Powered Plant Disease Detection & Recommendation System</div>",
    unsafe_allow_html=True
)

st.divider()

# Upload Image
uploaded_file = st.file_uploader(
    "Upload a plant leaf image",
    type=["jpg", "jpeg", "png"]
)

# Predict
if uploaded_file:

    st.image(
        uploaded_file,
        caption="Uploaded Leaf",
        use_container_width=True
    )

    if st.button("🔍 Detect Disease"):

        with st.spinner("Analyzing image..."):

            files = {
                "file": (
                    uploaded_file.name,
                    uploaded_file.getvalue()
                )
            }
            session = requests.Session()
            session.trust_env = False
             
            st.write("Using Session Without Proxy")

            response = session.post(
                "http://127.0.0.1:8000/predict",
                files=files,
                timeout=120
            )

            if response.status_code != 200:
                st.error(response.text)
                st.stop()

            data = response.json()

            prediction = data["prediction"]
            recommendation = data["recommendation"]

        st.success("Prediction Completed Successfully!")

        # Prediction Section
        st.divider()

        col1, col2 = st.columns(2)

        with col1:

            st.subheader("🌿 Disease Prediction")

            st.metric(
                "Detected Disease",
                prediction["disease"]\
                .replace("___", " ")\
                .replace("_", " ")
            )

            st.metric(
                "Confidence",
                f'{prediction["confidence"]:.2f}%'
            )

            st.progress(prediction["confidence"] / 100)

        with col2:

            severity = recommendation["severity"]

            if severity.lower() == "high":
                st.error(f"🔴 Severity: {severity}")

            elif severity.lower() == "medium":
                st.warning(f"🟠 Severity: {severity}")

            else:
                st.success(f"🟢 Severity: {severity}")

        st.divider()

        st.subheader("📖 Disease Description")
        st.write(recommendation["description"])

        # Symptoms
        st.divider()

        st.subheader("🍂 Symptoms")

        for symptom in recommendation["symptoms"]:
            st.markdown(f"✅ {symptom}")

        # Organic Treatment
        st.divider()

        st.subheader("🌱 Organic Treatment")

        for treatment in recommendation["organic_treatment"]:
            st.success(treatment)

        # Chemical Treatment
        st.divider()

        st.subheader("💊 Chemical Treatment")

        for treatment in recommendation["chemical_treatment"]:
            st.info(treatment)

  
        # Prevention
        st.divider()

        st.subheader("🛡 Prevention")

        for prevention in recommendation["prevention"]:
            st.markdown(f"✔ {prevention}")