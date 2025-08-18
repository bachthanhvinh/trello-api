import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from './environment'

// khởi tạo một đối tượng trelloDatabaseinstance ban đầu là null (vì chúng ta chưa connect)
let trelloDataBaseInstance = null

// khởi tạo đối tượng mongoClientInstance để connect tới MongoDB
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  // serverApi chỉ định một cái Stable API Version của MongoDB
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

// kết nối tới Database
export const CONNECT_DB = async () => {
  // Gọi kết nối tới MongoDB Atlas với URI đã khai bao trog thân của mongoClientInstance
  await mongoClientInstance.connect()

  // kết nối thành công thì gán ngược nó lại vào biến trelloDataBaseInstance
  trelloDataBaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

// Đóng kết nối tới Database khi cần
export const CLOSE_DB = async () => {
  await mongoClientInstance.close()
}

// function GET_DB (không async) này có nhiệm vụ export cái Trello Database Instance sau khi đã connect
// thành công MongoDB để chúng ta sử dụng ở nhiều nơi khác nhau trong code.

export const GET_DB = () => {
  if (!trelloDataBaseInstance) throw new Error('Must connect to Database first!')
  return trelloDataBaseInstance
}
