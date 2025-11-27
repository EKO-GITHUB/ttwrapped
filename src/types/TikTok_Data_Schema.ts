import { z } from "zod";

// ============================================================================
// Ads and data
// ============================================================================

export const AdInterests_Schema = z.object({
  AdInterestCategories: z.string(),
});
export type AdInterests = z.infer<typeof AdInterests_Schema>;

export const InstantFormAdsResponses_Schema = z.object({
  ResponsesList: z.null(),
});

export const Off_TikTok_Activity_DataList_Schema = z.object({
  TimeStamp: z.string(),
  Source: z.string(),
  Event: z.string(),
});
export type Off_TikTok_Activity_DataList = z.infer<typeof Off_TikTok_Activity_DataList_Schema>;

export const Off_TikTok_Activity_Schema = z.object({
  OffTikTokActivityDataList: z.array(Off_TikTok_Activity_DataList_Schema),
});
export type Off_TikTok_Activity = z.infer<typeof Off_TikTok_Activity_Schema>;

export const Ads_And_Data_Schema = z.object({
  "Ad Interests": AdInterests_Schema,
  "Instant Form Ads Responses": InstantFormAdsResponses_Schema,
  "Off TikTok Activity": Off_TikTok_Activity_Schema,
});
export type Ads_And_Data = z.infer<typeof Ads_And_Data_Schema>;

// ============================================================================
// App Settings
// ============================================================================

export const Block_List_Item_Schema = z.object({
  Date: z.string(),
  UserName: z.string(),
});
export type Block_List_Item = z.infer<typeof Block_List_Item_Schema>;

export const Block_List_Schema = z.object({
  App: z.number(),
  BlockList: z.array(Block_List_Item_Schema),
});

export const Content_Preferences_Schema = z.object({
  "Keyword filters for videos in Following feed": z.array(z.string()),
  "Keyword filters for videos in For You feed": z.array(z.string()),
  "Video Languages Preferences": z.array(z.string()),
});

export const Push_Notification_Schema = z.object({
  "Desktop notification": z.string(),
  "New Comments on My Video": z.string(),
  "New Fans": z.string(),
  "New Likes on My Video": z.string(),
});

export const Settings_Map_Schema = z.object({
  "Allow DownLoad": z.string(),
  "Allow Others to Find Me": z.string(),
  "Allow Reuse of Content": z.string(),
  "App Language": z.string(),
  "Content Preferences": Content_Preferences_Schema,
  "Family Content Preferences": z.record(z.string(), z.unknown()),
  "Filter Comments": z.string(),
  Interests: z.string(),
  "Personalized Ads": z.string(),
  "Private Account": z.string(),
  "Push Notification": Push_Notification_Schema,
  "Suggest your account to Facebook friends": z.string(),
  "Suggest your account to contacts": z.string(),
  "Suggest your account to people who open or send links to you": z.string(),
  "Web Language": z.string(),
  "Who Can Duet With Me": z.string(),
  "Who Can Post Comments": z.string(),
  "Who Can Send Me Message": z.string(),
  "Who Can Stitch with your videos": z.string(),
  "Who Can View Videos I Liked": z.string(),
});

export const Settings_Schema = z.object({
  App: z.number(),
  SettingsMap: Settings_Map_Schema,
});

export const App_Settings_Schema = z.object({
  "Block List": Block_List_Schema,
  Settings: Settings_Schema,
  UserThirdPlatformInformation: z.record(z.string(), z.unknown()),
});
export type App_Settings = z.infer<typeof App_Settings_Schema>;

// ============================================================================
// Comment
// ============================================================================

export const Comment_Item_Schema = z.object({
  date: z.string(),
  comment: z.string(),
  photo: z.string(),
  url: z.string(),
});
export type Comment_Item = z.infer<typeof Comment_Item_Schema>;

export const Comments_Schema = z.object({
  App: z.number(),
  CommentsList: z.array(Comment_Item_Schema),
});

export const Comment_Schema = z.object({
  Comments: Comments_Schema,
});
export type Comment = z.infer<typeof Comment_Schema>;

// ============================================================================
// Direct Message
// ============================================================================

export const Direct_Message_Item_Schema = z.object({
  Date: z.string(),
  From: z.string(),
  Content: z.string(),
});
export type Direct_Message_Item = z.infer<typeof Direct_Message_Item_Schema>;

export const Chat_History_Schema = z.record(z.string(), z.array(Direct_Message_Item_Schema));

export const Direct_Messages_Schema = z.object({
  ChatHistory: Chat_History_Schema,
});

export const Direct_Message_Schema = z.object({
  "Direct Messages": Direct_Messages_Schema,
});
export type Direct_Message = z.infer<typeof Direct_Message_Schema>;

// ============================================================================
// Income Plus Wallet Transactions
// ============================================================================

export const Transaction_History_Schema = z.object({
  TransactionsList: z.null(),
});

export const Income_Plus_Wallet_Transactions_Schema = z.object({
  "Transaction History": Transaction_History_Schema,
});
export type Income_Plus_Wallet_Transactions = z.infer<typeof Income_Plus_Wallet_Transactions_Schema>;

// ============================================================================
// Location Review
// ============================================================================

export const Location_Reviews_Schema = z.object({
  ReviewsList: z.null(),
});

export const Location_Review_Schema = z.object({
  "Location Reviews": Location_Reviews_Schema,
});
export type Location_Review = z.infer<typeof Location_Review_Schema>;

// ============================================================================
// Post
// ============================================================================

export const Post_Item_Schema = z.object({
  Date: z.string(),
  Link: z.string(),
  Likes: z.string(),
  WhoCanView: z.string(),
  AllowComments: z.string(),
  AllowStitches: z.string(),
  AllowDuets: z.string(),
  AllowStickers: z.string(),
  AllowSharingToStory: z.string(),
  ContentDisclosure: z.string(),
  AIGeneratedContent: z.string(),
  Sound: z.string(),
  Location: z.string(),
  Title: z.string(),
  AddYoursText: z.string(),
  AlternateText: z.string(),
  CoverImage: z.string(),
});
export type Post_Item = z.infer<typeof Post_Item_Schema>;

export const Posts_Schema = z.object({
  VideoList: z.array(Post_Item_Schema),
});

export const Recently_Deleted_Posts_Schema = z.object({
  PostList: z.array(z.unknown()),
});

export const Post_Schema = z.object({
  Posts: Posts_Schema,
  "Recently Deleted Posts": Recently_Deleted_Posts_Schema,
});
export type Post = z.infer<typeof Post_Schema>;

// ============================================================================
// Profile
// ============================================================================

export const AI_Moji_Schema = z.object({
  CreateDate: z.string(),
  AIMojiList: z.null(),
});

export const Autofill_Schema = z.object({
  PhoneNumber: z.string(),
  Email: z.string(),
  FirstName: z.string(),
  LastName: z.string(),
  Address: z.string(),
  ZipCode: z.string(),
  Unit: z.string(),
  City: z.string(),
  State: z.string(),
  Country: z.string(),
});

export const Platform_Info_Schema = z.object({
  Description: z.string(),
  Name: z.string(),
  Platform: z.string(),
  "Profile Photo": z.string(),
});

export const Profile_Map_Schema = z.object({
  PlatformInfo: z.array(Platform_Info_Schema),
  aiSelf: z.string(),
  bioDescription: z.string(),
  birthDate: z.string(),
  displayName: z.string(),
  emailAddress: z.string(),
  followerCount: z.number(),
  followingCount: z.number(),
  inferredGender: z.string(),
  instagramLink: z.string(),
  lemon8Link: z.string(),
  likesReceived: z.string(),
  profilePhoto: z.string(),
  profileVideo: z.string(),
  telephoneNumber: z.string(),
  userName: z.string(),
  youtubeLink: z.string(),
});

export const Profile_Info_Schema = z.object({
  App: z.number(),
  ProfileMap: Profile_Map_Schema,
});

export const Profile_Schema = z.object({
  "AI-Moji": AI_Moji_Schema,
  AISelfImage: z.record(z.string(), z.unknown()),
  Autofill: Autofill_Schema,
  "Profile Info": Profile_Info_Schema,
});
export type Profile = z.infer<typeof Profile_Schema>;

// ============================================================================
// TikTok Shop
// ============================================================================

export const Communication_With_Shops_Schema = z.object({
  CommunicationHistories: z.null(),
});

export const Current_Payment_Information_Schema = z.object({
  PayCard: z.null(),
});

export const Customer_Support_History_Schema = z.object({
  CustomerSupportHistories: z.null(),
});

export const Order_Dispute_History_Schema = z.object({
  OrderDisputeHistories: z.null(),
});

export const Order_History_Schema = z.object({
  OrderHistories: z.null(),
});

export const Product_Browsing_History_Item_Schema = z.object({
  browsing_date: z.string(),
  shop_name: z.string(),
  product_name: z.string(),
});
export type Product_Browsing_History_Item = z.infer<typeof Product_Browsing_History_Item_Schema>;

export const Product_Browsing_History_Schema = z.object({
  ProductBrowsingHistories: z.array(Product_Browsing_History_Item_Schema),
});

export const Product_Reviews_Schema = z.object({
  ProductReviewHistories: z.null(),
});

export const Returns_And_Refunds_History_Schema = z.object({
  ReturnAndRefundHistories: z.null(),
});

export const Saved_Address_Information_Schema = z.object({
  SavedAddress: z.null(),
});

export const Shopping_Cart_Item_Schema = z.object({
  CreateTime: z.string(),
  SkuCount: z.number(),
  ShopName: z.string(),
  ProductName: z.string(),
});
export type Shopping_Cart_Item = z.infer<typeof Shopping_Cart_Item_Schema>;

export const Shopping_Cart_List_Schema = z.object({
  ShoppingCart: z.array(Shopping_Cart_Item_Schema),
});

export const Vouchers_Schema = z.object({
  Vouchers: z.null(),
});

export const TikTok_Shop_Schema = z.object({
  "Communication With Shops": Communication_With_Shops_Schema,
  "Current Payment Information": Current_Payment_Information_Schema,
  "Customer Support History": Customer_Support_History_Schema,
  "Order Dispute History": Order_Dispute_History_Schema,
  "Order History": Order_History_Schema,
  "Product Browsing History": Product_Browsing_History_Schema,
  "Product Reviews": Product_Reviews_Schema,
  "Returns and Refunds History": Returns_And_Refunds_History_Schema,
  "Saved Address Information": Saved_Address_Information_Schema,
  "Shopping Cart List": Shopping_Cart_List_Schema,
  Vouchers: Vouchers_Schema,
});
export type TikTok_Shop = z.infer<typeof TikTok_Shop_Schema>;

// ============================================================================
// Tiktok Live
// ============================================================================

export const Go_Live_History_Schema = z.object({
  GoLiveList: z.null(),
});

export const Go_Live_Settings_Map_Schema = z.object({
  "Allow agencies to find and invite you": z.string(),
  "Allow others to invite you to co-host in LIVE": z.string(),
  "Allow people to send and receive comments during your LIVE": z.string(),
  "Allow suggested LIVE hosts to invite you to co-host in LIVE": z.string(),
  "Allow viewers to request to go LIVE with you": z.string(),
  "Allow viewers to see and send questions and answers in your LIVE": z.string(),
  "Allow viewers to send you gifts during your LIVE": z.string(),
  "Hide comments that contain the following keywords from your LIVE": z.array(z.string()),
  "Hide potential spam or offensive comments from your LIVE": z.string(),
  "People you assigned to moderate your LIVE": z.null(),
  "Show your username and gift information in features with ranking lists": z.string(),
});

export const Go_Live_Settings_Schema = z.object({
  SettingsMap: Go_Live_Settings_Map_Schema,
});

export const Watch_Live_Comment_Item_Schema = z.object({
  CommentTime: z.string(),
  CommentContent: z.string(),
  RawTime: z.number(),
});

export const Watch_Live_History_Item_Schema = z.object({
  Comments: z.array(Watch_Live_Comment_Item_Schema),
  Questions: z.null(),
  WatchTime: z.string(),
  Link: z.string(),
});

export const Watch_Live_History_Map_Schema = z.record(z.string(), Watch_Live_History_Item_Schema);

export const Watch_Live_History_Schema = z.object({
  WatchLiveMap: Watch_Live_History_Map_Schema,
});

export const Watch_Live_Settings_Map_Schema = z.object({
  app: z.string(),
  web: z.string(),
});

export const Watch_Live_Settings_Schema = z.object({
  WatchLiveSettingsMap: Watch_Live_Settings_Map_Schema,
  MostRecentModificationTimeInApp: z.string(),
  MostRecentModificationTimeInWeb: z.string(),
});

export const Tiktok_Live_Schema = z.object({
  "Go Live History": Go_Live_History_Schema,
  "Go Live Settings": Go_Live_Settings_Schema,
  "Watch Live Comment": z.record(z.string(), z.unknown()),
  "Watch Live History": Watch_Live_History_Schema,
  "Watch Live Settings": Watch_Live_Settings_Schema,
});
export type Tiktok_Live = z.infer<typeof Tiktok_Live_Schema>;

// ============================================================================
// Your Activity
// ============================================================================

export const Activity_Summary_Map_Schema = z.object({
  note: z.string(),
  videosCommentedOnSinceAccountRegistration: z.number(),
  videosSharedSinceAccountRegistration: z.number(),
  videosWatchedToTheEndSinceAccountRegistration: z.number(),
});

export const Activity_Summary_Schema = z.object({
  ActivitySummaryMap: Activity_Summary_Map_Schema,
});

export const Donation_Schema = z.object({
  DonationList: z.null(),
});

export const Favorite_Collection_Item_Schema = z.object({
  Date: z.string(),
  FavoriteCollection: z.string(),
});

export const Favorite_Collection_Schema = z.object({
  FavoriteCollectionList: z.array(Favorite_Collection_Item_Schema),
});

export const Favorite_Effects_Item_Schema = z.object({
  Date: z.string(),
  EffectLink: z.string(),
});

export const Favorite_Effects_Schema = z.object({
  FavoriteEffectsList: z.array(Favorite_Effects_Item_Schema),
});

export const Favorite_Comment_Schema = z.object({
  FavoriteCommentList: z.array(z.unknown()),
});

export const Favorite_Hashtags_Schema = z.object({
  FavoriteHashtagList: z.array(z.unknown()),
});

export const Favorite_Location_Schema = z.object({
  FavoriteLocationList: z.array(z.unknown()),
});

export const Favorite_Sounds_Schema = z.object({
  FavoriteSoundList: z.null(),
});

export const Favorite_Videos_Item_Schema = z.object({
  Date: z.string(),
  Link: z.string(),
});

export const Favorite_Videos_Schema = z.object({
  App: z.number(),
  FavoriteVideoList: z.array(Favorite_Videos_Item_Schema),
});

export const Follower_Item_Schema = z.object({
  Date: z.string(),
  UserName: z.string(),
});

export const Follower_Schema = z.object({
  App: z.number(),
  IsFastLane: z.boolean(),
  FansList: z.array(Follower_Item_Schema),
});

export const Following_Item_Schema = z.object({
  Date: z.string(),
  UserName: z.string(),
});

export const Following_Schema = z.object({
  App: z.number(),
  IsFastLane: z.boolean(),
  Following: z.array(Following_Item_Schema),
});

export const Fundraiser_Schema = z.object({
  FundraiserList: z.null(),
});

export const Hashtag_List_Schema = z.object({
  HashtagName: z.string(),
  HashtagLink: z.string(),
});

export const Hashtag_Schema = z.object({
  HashtagList: z.array(Hashtag_List_Schema),
});

export const Like_List_Item_Schema = z.object({
  date: z.string(),
  link: z.string(),
});

export const Like_List_Schema = z.object({
  App: z.number(),
  ItemFavoriteList: z.array(Like_List_Item_Schema),
});

export const Login_History_Item_Schema = z.object({
  Date: z.string(),
  IP: z.string(),
  DeviceModel: z.string(),
  DeviceSystem: z.string(),
  NetworkType: z.string(),
  Carrier: z.string(),
});
export type Login_History_Item = z.infer<typeof Login_History_Item_Schema>;

export const Login_History_Schema = z.object({
  LoginHistoryList: z.array(Login_History_Item_Schema),
});

export const Location_Data_Schema = z.object({
  Date: z.string(),
  GpsData: z.string(),
  LastRegion: z.string(),
});

export const Most_Recent_Location_Data_Schema = z.object({
  LocationData: Location_Data_Schema,
});

export const Send_Gifts_Schema = z.object({
  SendGifts: z.null(),
});

export const Buy_Gifts_Schema = z.object({
  BuyGifts: z.null(),
});

export const Purchases_Schema = z.object({
  SendGifts: Send_Gifts_Schema,
  BuyGifts: Buy_Gifts_Schema,
});

export const Search_Item_Schema = z.object({
  Date: z.string(),
  SearchTerm: z.string(),
});

export const Searches_Schema = z.object({
  SearchList: z.array(Search_Item_Schema),
});

export const Share_History_Item_Schema = z.object({
  Date: z.string(),
  SharedContent: z.string(),
  Link: z.string(),
  Method: z.string(),
});

export const Share_History_Schema = z.object({
  ShareHistoryList: z.array(Share_History_Item_Schema),
});

export const Status_Item_Schema = z.object({
  Resolution: z.string(),
  "App Version": z.string(),
  IDFA: z.string(),
  GAID: z.string(),
  "Android ID": z.string(),
  IDFV: z.string(),
  UID: z.number(),
  DID: z.string(),
  "Web ID": z.string(),
});

export const Status_Schema = z.object({
  "Status List": z.array(Status_Item_Schema),
});

export const Watch_History_Item_Schema = z.object({
  Date: z.string(),
  Link: z.string(),
});

export const Watch_History_Schema = z.object({
  VideoList: z.array(Watch_History_Item_Schema),
});

export const Your_Activity_Schema = z.object({
  "Activity Summary": Activity_Summary_Schema,
  Collection: z.record(z.string(), z.unknown()),
  Donation: Donation_Schema,
  "Favorite Collection": Favorite_Collection_Schema,
  "Favorite Effects": Favorite_Effects_Schema,
  "Favorite Comment": Favorite_Comment_Schema,
  "Favorite Hashtags": Favorite_Hashtags_Schema,
  "Favorite Location": Favorite_Location_Schema,
  "Favorite Sounds": Favorite_Sounds_Schema,
  "Favorite Videos": Favorite_Videos_Schema,
  Follower: Follower_Schema,
  Following: Following_Schema,
  Fundraiser: Fundraiser_Schema,
  Hashtag: Hashtag_Schema,
  "Like List": Like_List_Schema,
  "Login History": Login_History_Schema,
  "Most Recent Location Data": Most_Recent_Location_Data_Schema,
  Purchases: Purchases_Schema,
  Searches: Searches_Schema,
  "Share History": Share_History_Schema,
  Status: Status_Schema,
  "Watch History": Watch_History_Schema,
});
export type Your_Activity = z.infer<typeof Your_Activity_Schema>;

// ============================================================================
// Main TikTok Data Schema
// ============================================================================

export const TikTok_Data_Schema = z.object({
  "Ads and data": Ads_And_Data_Schema,
  "App Settings": App_Settings_Schema,
  Comment: Comment_Schema,
  "Direct Message": Direct_Message_Schema,
  "Income Plus Wallet Transactions": Income_Plus_Wallet_Transactions_Schema,
  "Location Review": Location_Review_Schema,
  Post: Post_Schema,
  Profile: Profile_Schema,
  "TikTok Shop": TikTok_Shop_Schema,
  "Tiktok Live": Tiktok_Live_Schema,
  "Your Activity": Your_Activity_Schema,
});

export type TikTok_Data = z.infer<typeof TikTok_Data_Schema>;
