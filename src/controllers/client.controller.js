
const addSliderContent = async (req, res) => {
    const { sliderImage } = req.files;
    const { sliderTitle, sliderHeading } = req.body;

    let imageUrl = '';
    if (Array.isArray(sliderImage) && sliderImage.length > 0) {
        const imge1Object = sliderImage[0];
        imageUrl = await uploadStream(imge1Object.buffer, 'frontImage');
    }
}

const getSliderContent = async (req, res) => {

}

const editSliderContent = async (req, res) => {

}

const deleteSliderContent = async (req, res) => {

}

module.exports = {
    addSliderContent,
    getSliderContent,
    editSliderContent,
    deleteSliderContent
}