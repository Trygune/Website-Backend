import Project from '../models/Project.ts'
import Post from '../models/Post.ts'
import Experience from '../models/Experience.ts'
import { stat } from 'node:fs'
import { getArrayQuery } from '../utils/query.ts'

type DashboardQuery = {
  categories?: string
}

type StatsProps = {
  projects?: {
    total: number
    published: number
    drafts: number
  }
  posts?: {
    total: number
    published: number
    drafts: number
  }
  experience?: {
    total: number
    current: number
  }
}

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

export const getDashboardStats = async (query: DashboardQuery) => {
  const categories = getArrayQuery(query.categories)

  if (!!categories) {
    let stats: StatsProps = {}
    for (const category of categories) {
      if (category === 'projects') {
        const { totalProjects, publishedProjects, draftProjects } =
          await projectStats()
        const projects = {
          total: totalProjects,
          published: publishedProjects,
          drafts: draftProjects,
        }
        stats['projects'] = projects
      }
      if (category === 'posts') {
        const { totalPosts, publishedPosts, draftPosts } = await postStats()
        const posts = {
          total: totalPosts,
          published: publishedPosts,
          drafts: draftPosts,
        }
        stats['posts'] = posts
      }
      if (category === 'experience') {
        const { totalExperience, currentExperience } = await experienceStats()
        const experience = {
          total: totalExperience,
          current: currentExperience,
        }
        stats['experience'] = experience
      }
    }
    return stats
  }

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
