class PostService {
  static async insertPost (email, name, date, tel, selected, lang) {
    const res = {
      email, name, date, tel, selected, lang
    }
    return res
  }
}

export default PostService
