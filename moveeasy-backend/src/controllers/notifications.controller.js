
const notificationsController = {
  getNotifications: async (req, res) => {
    try {
      const notifications = await prisma.notification.findMany({
        where: { userId: req.user.id },
      });
      res.json(notifications);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },

    markAsRead: async (req, res) => {
    const { id } = req.params;

    try {
      const notification = await prisma.notification.update({
        where: { id: Number(id) },
        data: { estLu: true },
      });
      res.json(notification);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
};

export default notificationsController;
