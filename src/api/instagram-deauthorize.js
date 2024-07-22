export default function handler(req, res) {
    if (req.method === 'POST') {
      console.log('User deauthorized the app:', req.body);
      // TODO: Implement deauthorization logic
      // - Verify the request is from Instagram
      // - Remove user's access token and data from your storage
      res.status(200).json({ message: 'Deauthorization handled' });
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }