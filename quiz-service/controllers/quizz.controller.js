const questionService = require('../services/quizz.service.js')

exports.addQuizListController = async (req, res) => {
    try {
        // Lấy dữ liệu từ yêu cầu
        const { title, description, quizzes, scriptIntro } = req.body;
        // Kiểm tra xem tất cả các trường cần thiết đã có chưa
        if (!title || !description || !Array.isArray(quizzes) || quizzes.length === 0) {
            return res.status(400).send("Missing required fields or quizzes array is empty");
        }

        // Gọi dịch vụ để thêm danh sách quiz
        const newQuizList = await questionService.addQuizList({
            title: title,
            description: description,
            scriptIntro: scriptIntro,
            quizzes: quizzes
        });

        // Kiểm tra kết quả từ dịch vụ
        if (!newQuizList) {
            return res.status(400).send("Failed to add quiz list");
        }

        // Trả về phản hồi thành công
        return res.status(200).send(newQuizList);
    }
    catch (error) {
        console.error("Error adding quiz list:", error);
        return res.status(500).send("System error: failed to add quiz list");
    }
};


exports.getQuizListByIdController = async (req, res) => {
    const { id } = req.params;

    try {
        const quizList = await questionService.getQuizListById(id);
        res.status(200).json(quizList);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};