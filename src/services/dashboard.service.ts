import Project from '../models/Project.ts'
import Post from '../models/Post.ts'
import Experience from '../models/Experience.ts'

const projectStats = async () => {
  const [totalProjects, publishedProjects, draftProjects] = await Promise.all([
    Project.countDocuments(),
    Project.countDocuments({ status: 'published' }),
    Project.countDocuments({ status: 'draft' }),
  ])
  return { totalProjects, publishedProjects, draftProjects }
}
const postStats = async () => {
  const [totalPosts, publishedPosts, draftPosts] = await Promise.all([
    Post.countDocuments(),
    Post.countDocuments({ status: 'published' }),
    Post.countDocuments({ status: 'draft' }),
  ])

  return { totalPosts, publishedPosts, draftPosts }
}
const experienceStats = async () => {
  const [totalExperience, currentExperience] = await Promise.all([
    Experience.countDocuments(),
    Experience.countDocuments({ current: true }),
  ])

  return { totalExperience, currentExperience }
}
export const getDashboardStats = async () => {
  const { totalProjects, publishedProjects, draftProjects } =
    await projectStats()
  const { totalPosts, publishedPosts, draftPosts } = await postStats()
  const { totalExperience, currentExperience } = await experienceStats()
  const recentProjects = await Project.find({})
    .sort({ createdAt: -1 })
    .limit(5)
    .select('title slug description technologies status createdAt')
  const recentPosts = await Post.find({})
    .sort({ createdAt: -1 })
    .limit(5)
    .select('title slug category status publishedAt createdAt')

  return {
    projects: {
      total: totalProjects,
      published: publishedProjects,
      drafts: draftProjects,
    },
    posts: {
      total: totalPosts,
      published: publishedPosts,
      drafts: draftPosts,
    },
    experience: {
      total: totalExperience,
      current: currentExperience,
    },
    recentProjects,
    recentPosts,
  }
}
